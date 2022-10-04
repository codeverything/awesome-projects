let billTotalInput = document.getElementById("billTotalInput");
let tipInput = document.getElementById("tipInput");
let numberOfPeople = document.getElementById("numberOfPeople");
let perPersonTotal = document.getElementById("perPersonTotal");
let numberpeople = Number(numberOfPeople.innerText);

//calculating toyal bill per person
const calculateBill = () => {
  // get bill from user input & convert it into a number

  // get the tip from user & convert it into a percentage (divide by 100)

  // get the total tip amount

  // calculate the total (tip amount + bill)
  let total =
    Number(billTotalInput.value) +
    Number(billTotalInput.value) * (Number(tipInput.value) / 100);

  // calculate the per person total (total divided by number of people)
  let totalPerPerson = total / numberpeople;

  // update the perPersonTotal on DOM & show it to user
  perPersonTotal.innerText = `${totalPerPerson}`;
};

// Splits the bill between more people

const increasePeople = () => {
  // increment the amount of people

  numberpeople += 1;
  // update the DOM with the new number of people

  numberOfPeople.innerText = numberpeople;
  // calculate the bill based on the new number of people
  calculateBill();
};

const decreasePeople = () => {
  // guard clause
  // if amount is 1 or less simply return
  // (a.k.a you can't decrease the number of people to 0 or negative!)
  if (numberpeople === 1) {
    return;
  }

  // decrement the amount of people
  numberpeople -= 1;

  // update the DOM with the new number of people
  numberOfPeople.innerText = numberpeople;

  // calculate the bill based on the new number of people
  calculateBill();
};
