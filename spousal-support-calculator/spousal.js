document.addEventListener("DOMContentLoaded", function () {

  function getVal(id) {
    const el = document.getElementById(id);
    return el ? parseFloat(el.value) || 0 : 0;
  }

  function format(val) {
    return "$" + val.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function calculate() {
    const income1 = getVal('income1');
    const child1 = getVal('child1');
    const ins1 = getVal('ins1');

    const income2 = getVal('income2');
    const child2 = getVal('child2');
    const ins2 = getVal('ins2');

    const adjusted1 = income1 - child1 - ins1;
    const adjusted2 = income2 - child2 - ins2;

    if (adjusted1 <= 0 || adjusted2 <= 0) {
      document.getElementById('monthly').innerText = "$0.00";
      document.getElementById('annual').innerText = "$0.00";
      return;
    }

    const difference = Math.abs(adjusted1 - adjusted2);

    const supportRate = 0.0295; // 2.95%

    const annual = difference * supportRate;
    const monthly = annual / 12;

    document.getElementById('monthly').innerText = format(monthly);
    document.getElementById('annual').innerText = format(annual);
  }

  // Attach listeners
  document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", calculate);
  });

});
