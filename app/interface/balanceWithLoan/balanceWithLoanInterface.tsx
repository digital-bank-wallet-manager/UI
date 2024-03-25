import LoanEvolutionInterface from "../bankLoan/loanEvolution";
import { BalanceInterface } from "../balance/balanceInterface";

export default interface BalanceWithLoanInterface{
    balance: BalanceInterface
    loanEvolution: LoanEvolutionInterface
}