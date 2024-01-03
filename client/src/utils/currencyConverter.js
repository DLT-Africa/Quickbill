// Assuming you have a mechanism to fetch currency conversion rates (e.g., an API call)
const fetchConversionRate = async (fromCurrency, toCurrency) => {
    // Replace this with your actual API call to fetch the rate
    const response = await fetch(`https://open.er-api.com/v6/latest/usd`);
    const data = await response?.json();
    const rates = 1/data?.rates[fromCurrency]
    return rates
  };
  
  export const convertCurrency = async (amount, fromCurrency, toCurrency) => {
    const rate = await fetchConversionRate(fromCurrency, toCurrency);
    return amount * rate;
  };
  