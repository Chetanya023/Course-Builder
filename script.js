document.getElementById('addModuleBtn').addEventListener('click', addModule);

let moduleIdCounter = 0;

function addModule() {
    moduleIdCounter++;
    const module = document.createElement('div');
    module.classList.add('module');
    module.setAttribute('data-module-id', moduleIdCounter);
    module.innerHTML = `
        <div class="module-header">
            <input type="text" value="New Module" class="module-title">
            <div>
                <button onclick="renameModule(this)">Rename</button>
                <button onclick="deleteModule(this)">Delete</button>
                <button onclick="addResource(this)">Add Resource</button>
                <button onclick="addLink(this)">Add Link</button>
            </div>
        </div>
        <div class="module-content"></div>
    `;
    document.getElementById('modulesContainer').appendChild(module);

    enableDragAndDrop();
}

function renameModule(button) {
    const module = button.closest('.module');
    const title = module.querySelector('.module-title');
    title.disabled = !title.disabled;
    if (!title.disabled) {
        title.focus();
    }
}

function deleteModule(button) {
    const module = button.closest('.module');
    module.remove();
}

function addResource(button) {
    const module = button.closest('.module');
    const moduleContent = module.querySelector('.module-content');
    const resource = document.createElement('div');
    resource.classList.add('resource');
    resource.innerHTML = `
        <input type="text" value="New Resource" class="resource-name">
        <input type="file" onchange="uploadResource(this)">
        <button onclick="renameResource(this)">Rename</button>
        <button onclick="deleteResource(this)">Delete</button>
        <span class="drag-handle">::</span>
    `;
    moduleContent.appendChild(resource);
}

function addLink(button) {
    const module = button.closest('.module');
    const moduleContent = module.querySelector('.module-content');
    const resource = document.createElement('div');
    resource.classList.add('resource');
    resource.innerHTML = `
        <input type="text" value="http://example.com" class="resource-link">
        <button onclick="editLink(this)">Edit</button>
        <button onclick="deleteResource(this)">Delete</button>
        <span class="drag-handle">::</span>
    `;
    moduleContent.appendChild(resource);
}

function renameResource(button) {
    const resource = button.closest('.resource');
    const name = resource.querySelector('.resource-name');
    name.disabled = !name.disabled;
    if (!name.disabled) {
        name.focus();
    }
}

function editLink(button) {
    const resource = button.closest('.resource');
    const link = resource.querySelector('.resource-link');
    link.disabled = !link.disabled;
    if (!link.disabled) {
        link.focus();
    }
}

function deleteResource(button) {
    const resource = button.closest('.resource');
    resource.remove();
}

function uploadResource(input) {
    const file = input.files[0];
    if (file) {
        const resource = input.closest('.resource');
        resource.querySelector('.resource-name').value = file.name;
    }
}

function enableDragAndDrop() {
    const containers = document.querySelectorAll('.module-content');
    containers.forEach(container => {
        new Sortable(container, {
            group: 'shared',
            handle: '.drag-handle',
            animation: 150
        });
    });
}

// Initial call to enable drag-and-drop
enableDragAndDrop();
