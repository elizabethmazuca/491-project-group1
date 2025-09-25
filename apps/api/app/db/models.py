# apps/api/app/db/models.py
from __future__ import annotations

from datetime import datetime
from typing import Optional

from sqlalchemy import String, Integer, Float, DateTime, ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column

from .base import Base


class User(Base):
    __tablename__ = "users"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    email: Mapped[str] = mapped_column(String, unique=True, index=True)
    display: Mapped[str] = mapped_column(String)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())


class Profile(Base):
    __tablename__ = "profiles"

    user_id: Mapped[str] = mapped_column(String, ForeignKey("users.id"), primary_key=True)
    balance: Mapped[int] = mapped_column(Integer, default=20000)  # cents


class Game(Base):
    __tablename__ = "games"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    league: Mapped[str] = mapped_column(String)
    start_time: Mapped[datetime] = mapped_column(DateTime, index=True)
    status: Mapped[str] = mapped_column(String, default="scheduled")
    home_team: Mapped[str] = mapped_column(String)
    away_team: Mapped[str] = mapped_column(String)
    home_score: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    away_score: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)


class Odds(Base):
    __tablename__ = "odds"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    game_id: Mapped[str] = mapped_column(String, ForeignKey("games.id"))
    market: Mapped[str] = mapped_column(String)  # "moneyline"
    side: Mapped[str] = mapped_column(String)    # "HOME" | "AWAY"
    price_dec: Mapped[float] = mapped_column(Float)


class Bet(Base):
    __tablename__ = "bets"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    user_id: Mapped[str] = mapped_column(String, ForeignKey("users.id"))
    game_id: Mapped[str] = mapped_column(String, ForeignKey("games.id"))
    market: Mapped[str] = mapped_column(String, default="moneyline")
    pick_side: Mapped[str] = mapped_column(String)  # "HOME" | "AWAY"
    stake_cents: Mapped[int] = mapped_column(Integer)
    odds_dec: Mapped[float] = mapped_column(Float)
    status: Mapped[str] = mapped_column(String, default="pending")  # pending|won|lost|canceled
    payout_cents: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now())
    settled_at: Mapped[Optional[datetime]] = mapped_column(DateTime, nullable=True)
