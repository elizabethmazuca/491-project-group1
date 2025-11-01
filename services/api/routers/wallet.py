from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()
_BALANCES: dict[int, int] = {1: 1000}

class Balance(BaseModel):
    user_id: int
    balance: int

@router.get("/wallet/me", response_model=Balance)
def my_balance():
    return Balance(user_id=1, balance=_BALANCES.get(1, 0))

class DepositReq(BaseModel):
    amount: int

@router.post("/wallet/deposit", response_model=Balance)
def deposit(req: DepositReq):
    if req.amount <= 0:
        raise HTTPException(400, "amount must be > 0")
    _BALANCES[1] = _BALANCES.get(1, 0) + req.amount
    return Balance(user_id=1, balance=_BALANCES[1])
