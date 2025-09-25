from uuid import uuid4
from datetime import datetime, timedelta

from sqlalchemy import select
from .base import engine, SessionLocal
from .models import Base, User, Profile, Game, Odds


DEMO_EMAIL = "demo@payday.app"
DEMO_USER_ID = "demo-user-1"  # deterministic so re-running seed is idempotent


def get_or_create_demo_user(s):
    u = s.execute(select(User).where(User.id == DEMO_USER_ID)).scalar_one_or_none()
    if not u:
        u = User(id=DEMO_USER_ID, email=DEMO_EMAIL, display="Demo User")
        s.add(u)
        s.flush()  # make sure INSERT happens before we insert Profile
    p = s.execute(select(Profile).where(Profile.user_id == DEMO_USER_ID)).scalar_one_or_none()
    if not p:
        p = Profile(user_id=DEMO_USER_ID, balance=20000)
        s.add(p)
    return u


def seed_games_and_odds(s):
    # avoid duplicating the same day's demo games
    today5 = datetime.now().replace(hour=17, minute=0, second=0, microsecond=0)
    existing = s.execute(
        select(Game).where(
            Game.league == "NBA",
            Game.start_time >= today5.replace(hour=0, minute=0, second=0, microsecond=0),
            Game.start_time <= today5.replace(hour=23, minute=59, second=59, microsecond=0),
        )
    ).scalars().all()
    if existing:
        return  # already seeded for today

    g1 = Game(
        id=str(uuid4()), league="NBA", start_time=today5,
        home_team="LAL", away_team="GSW"
    )
    g2 = Game(
        id=str(uuid4()), league="NBA", start_time=today5 + timedelta(hours=2),
        home_team="BOS", away_team="MIA"
    )
    s.add_all([g1, g2]); s.flush()

    s.add_all([
        Odds(id=str(uuid4()), game_id=g1.id, market="moneyline", side="HOME", price_dec=1.80),
        Odds(id=str(uuid4()), game_id=g1.id, market="moneyline", side="AWAY", price_dec=2.05),
        Odds(id=str(uuid4()), game_id=g2.id, market="moneyline", side="HOME", price_dec=1.70),
        Odds(id=str(uuid4()), game_id=g2.id, market="moneyline", side="AWAY", price_dec=2.20),
    ])


def run():
    Base.metadata.create_all(bind=engine)
    with SessionLocal() as s:
        get_or_create_demo_user(s)
        seed_games_and_odds(s)
        s.commit()


if __name__ == "__main__":
    run()
