(function() {
  //TODO Change string value to actual organisation name
  var organisationName = 'Organisation Name';
  // Compose top bar html
  var html =
    '<div id="otg-org-top-bar" style="position: relative; width: 100%; background-color: #005284; z-index: 2000000; box-shadow: 0 4px 5px 0px grey; top: 0; height: 50px;">';
  html +=
    '<img src="/logo.png" title="Logo" alt="' +
    organisationName +
    '" style="float: left; margin-left: 20px; margin-top: 5px; height: 40px;" class="org_logo" />';
  html +=
    '<span id="otg-org-username" title="Logged in user" style="float: right; margin-right: 20px; margin-top: 15px; color: white; font-family: Inter, serif; font-style: italic;">&nbsp;</span>';
  html += '</div>';
  // Inject top bar as the first body element
  var topBarContainerDiv = document.createElement('div');
  topBarContainerDiv.innerHTML = html;
  document.body.insertBefore(topBarContainerDiv, document.body.firstChild);
  // Make the bar sticky. Basically behave similar to css position: sticky. IE does not support sticky value for the css attribute though.
  var otgOrgTopBar = document.getElementById('otg-org-top-bar');
  window.addEventListener('scroll', function() {
    otgOrgTopBar.style.position = window.scrollY === 0 ? 'relative' : 'fixed';
  });
  // Fill out username
  getLoggedInUser().then(function(username) {
    document.getElementById('otg-org-username').innerHTML = username;
  });
})();
