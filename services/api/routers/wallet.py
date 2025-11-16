from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter(prefix="/wallet", tags=["wallet"])

_BALANCES: dict[int, int] = {1: 1000}

def _get_balance(uid: int = 1) -> int:
    return _BALANCES.get(uid, 0)

def _add_balance(delta: int, uid: int = 1) -> int:
    _BALANCES[uid] = _get_balance(uid) + delta
    return _BALANCES[uid]

class Balance(BaseModel):
    user_id: int
    balance: int

class DepositReq(BaseModel):
    amount: int

@router.get("/me", response_model=Balance)
def my_balance():
    return Balance(user_id=1, balance=_get_balance())

@router.post("/deposit", response_model=Balance)
def deposit(req: DepositReq):
    if req.amount <= 0:
        raise HTTPException(status_code=400, detail="amount must be > 0")
    new_bal = _add_balance(req.amount)
    return Balance(user_id=1, balance=new_bal)
