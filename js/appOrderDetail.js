$(document).ready(function () {

    let orderData = JSON.parse('<%=session.getAttribute("orderData")%>');

    console.log("orderData: " + orderData);
});