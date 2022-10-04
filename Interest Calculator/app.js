

const submit = document.getElementById('loan-form');


submit.addEventListener('submit', function(e)
{
   
    document.getElementById('results').style.display = 'none';
   

    document.getElementById('loading').style.display = 'block';
    setTimeout(calculateResults,2000);

    e.preventDefault();

});


function calculateResults()
{   console.log('Calculate')
    
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');

    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value)/100;
    const calculatedPayment = parseFloat(years.value);

    
    const x = Math.pow(1+ calculatedInterest , calculatedPayment);
    const monthly = (principal*x)/(12);

    if(isFinite(monthly))
    {
       monthlyPayment.value = monthly.toFixed(2);
       totalPayment.value = (principal*x).toFixed(2);
       totalInterest.value= (totalPayment.value-principal).toFixed(2);

         document.getElementById('results').style.display = 'block';
   

         document.getElementById('loading').style.display = 'none';
    }
     else{

        showError('Please check your numbers');
    }   
    


    function showError(error)
    {
        
          document.getElementById('results').style.display = 'none';
   
         document.getElementById('loading').style.display = 'none';
        
        const errorGif = document.createElement('div');
      
        errorGif.className = 'alert alert-danger'

        
        errorGif.appendChild(document.createTextNode(error));

        const card = document.querySelector('.card');
        const heading = document.querySelector('.heading');

        card.insertBefore(errorGif,heading);
        setTimeout(clearError,3000);

    }


    function clearError()
    {
        document.querySelector('.alert').remove();
    }
}