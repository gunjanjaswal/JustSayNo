// JustSayNo Onboarding Script
let selectedPreference = null;

// Handle preference selection
document.getElementById('rejectBtn').addEventListener('click', () => {
  selectPreference('reject');
});

document.getElementById('necessaryBtn').addEventListener('click', () => {
  selectPreference('necessary');
});

function selectPreference(value) {
  selectedPreference = value;
  
  // Update UI
  document.querySelectorAll('.btn').forEach(btn => {
    btn.classList.remove('selected');
  });
  
  if (value === 'reject') {
    document.getElementById('rejectBtn').classList.add('selected');
  } else {
    document.getElementById('necessaryBtn').classList.add('selected');
  }
  
  // Enable finish button
  document.getElementById('finishBtn').disabled = false;
}

// Handle finish button
document.getElementById('finishBtn').addEventListener('click', async () => {
  if (!selectedPreference) return;
  
  // Save preference
  await chrome.storage.sync.set({
    userPreference: selectedPreference,
    onboardingCompleted: true
  });
  
  // Close tab
  window.close();
});

// Pre-select "Reject All" as default
selectPreference('reject');
