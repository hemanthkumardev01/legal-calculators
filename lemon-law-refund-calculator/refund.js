document.addEventListener("DOMContentLoaded", function () {

  function val(id) {
    const el = document.getElementById(id);
    return el ? parseFloat(el.value) || 0 : 0;
  }

  function format(num) {
    return "$" + num.toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function calculate() {
    const price = val("price");
    const miles = val("miles");
    const down = val("down");
    const monthly = val("monthly");
    const payments = val("payments");

    // ✅ From your Gravity Form:
    // usage = (price * miles) / 120000
    const usageFee = (price * miles) / 120000;

    // total paid = (monthly * payments) + down
    const totalPaid = (monthly * payments) + down;

    // refund = totalPaid - usageFee
    const refund = totalPaid - usageFee;

    document.getElementById("usage").innerText = format(usageFee);
    document.getElementById("paid").innerText = format(totalPaid);
    document.getElementById("refund").innerText = format(refund);
  }

  document.querySelectorAll("input").forEach(input => {
    input.addEventListener("input", calculate);
  });

});
