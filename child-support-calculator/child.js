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

  const custodialTime = document.getElementById('input_7_8');
  const nonCustodialTime = document.getElementById('input_7_20');

  // Auto sync percentage fields
  if (custodialTime && nonCustodialTime) {

    custodialTime.addEventListener('input', function () {
      let val = Math.min(100, Math.max(0, parseFloat(this.value) || 0));
      nonCustodialTime.value = 100 - val;
      calculate();
    });

    nonCustodialTime.addEventListener('input', function () {
      let val = Math.min(100, Math.max(0, parseFloat(this.value) || 0));
      custodialTime.value = 100 - val;
      calculate();
    });
  }

  function calculate() {
    const income1 = getVal('input_7_1');
    const income2 = getVal('input_7_16');
    const children = Math.max(1, getVal('input_7_24'));
    const time = Math.min(100, Math.max(0, getVal('input_7_20')));

    const total = income1 + income2;

    if (total <= 0) {
      document.getElementById('monthly').innerText = "$0.00";
      document.getElementById('annual').innerText = "$0.00";
      return;
    }

    // Base formula
    const baseSupport = total * 0.25 * children;

    // Time adjustment
    const adjustedSupport = baseSupport * (1 - (time / 100));

    const monthly = adjustedSupport / 12;

    document.getElementById('monthly').innerText = format(monthly);
    document.getElementById('annual').innerText = format(adjustedSupport);
  }

  // Attach listeners
  document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", calculate);
  });

});
