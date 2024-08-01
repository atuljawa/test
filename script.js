let historyStack = [];

function selectDeliverable(deliverable) {
    historyStack.push('home');
    showSection('snapshot-selection');
}

function selectExistingSnapshot() {
    historyStack.push('snapshot-selection');
    fetchExistingSnapshots();
    showSection('existing-snapshot');
}

function fetchExistingSnapshots() {
    const snapshots = ['Snapshot1', 'Snapshot2', 'Snapshot3'];
    populateSelect('snapshot-select', snapshots);
}

function createNewSnapshot() {
    historyStack.push('snapshot-selection');
    fetchInstances();
    showSection('new-snapshot');
}

function fetchInstances() {
    const instances1 = ['Instance1A', 'Instance1B', 'Instance1C'];
    const instances2 = ['Instance2A', 'Instance2B', 'Instance2C'];
    populateSelect('instance1', instances1);
    populateSelect('instance2', instances2);
}

function populateSelect(elementId, options) {
    const select = document.getElementById(elementId);
    select.innerHTML = '';
    options.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        select.appendChild(opt);
    });
}

document.getElementById('existing-snapshot-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const selectedSnapshot = document.getElementById('snapshot-select').value;
    historyStack.push('existing-snapshot');
    document.getElementById('selected-snapshot').textContent = selectedSnapshot;
    showSection('report-page');
});

document.getElementById('snapshot-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const instance1 = document.getElementById('instance1').value;
    const instance2 = document.getElementById('instance2').value;
    const snapshotName = document.getElementById('snapshot-name').value;
    historyStack.push('new-snapshot');
    createSnapshot(instance1, instance2, snapshotName);
});

function createSnapshot(instance1, instance2, snapshotName) {
    const newSnapshot = {
        name: snapshotName,
        instance1: instance1,
        instance2: instance2
    };
    console.log('Creating snapshot:', newSnapshot);
    document.getElementById('selected-snapshot').textContent = snapshotName;
    showSection('report-page');
}

function goBack() {
    const currentState = historyStack.pop();
    const previousState = historyStack[historyStack.length - 1];
    showSection(previousState);
}

function showSection(sectionId) {
    const sections = ['home', 'snapshot-selection', 'existing-snapshot', 'new-snapshot', 'report-page'];
    sections.forEach(section => {
        document.getElementById(section).classList.add('hidden');
    });
    document.getElementById(sectionId).classList.remove('hidden');
}
