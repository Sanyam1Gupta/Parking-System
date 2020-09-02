export const FINALCIAL_FORM_INITIAL_STATE = {
  monthlyIncome: '',
  haveDetailedIncome: false,
  detailIncome: {
    businessIncome: '',
    monthlySalary: '',
    bonusIncome: '',
    pensionIncome: '',
    interestIncome: '',
    anyOtherIncome: '',
  },
  monthlyExpense: '',
  haveDetailedExpense: false,
  detailedExpense: {
    emi: {
      existingEMI: '',
    },
    monthlyBills: {
      rent: '',
      householdHelperSalary: '',
      utilities: '',
      groceriesAndSupply: '',
      otherMonthlyBills: '',
    },
    investment: {
      mutualFundSips: '',
      rdOrOthers: '',
    },
    entertainment: {
      dinningOutOrMovies: '',
      shoppingOrOtherExpense: '',
    },
    conveyance: {
      fuel: '',
      publicTransport: '',
      otherConveyance: '',
    },
    expenseOnDependants: {
      collegeOrCollegeFees: '',
      medicinesOrLabReport: '',
      familySupport: '',
    },
    otherAnnualExpense: {
      subscriptions: '',
      insurancePremium: '',
      holidayOrOtherExpenses: '',
    },
  },
  existingSavings: '',
};

export const FORM_MISC_DATA = {};
