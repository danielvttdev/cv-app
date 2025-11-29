function switchTab(index) {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));
    // Show selected tab
    document.getElementById(`tab-${index}`).classList.remove('hidden');

    // Update buttons
    [0, 1, 2, 3].forEach(i => {
        const btn = document.getElementById(`tab-btn-${i}`);
        if (i === index) {
            // Active state
            btn.classList.remove('bg-white/20', 'text-purple-100', 'hover:bg-white/30');
            btn.classList.add('bg-white', 'text-purple-600', 'shadow-lg', 'transform', 'scale-105');
        } else {
            // Inactive state
            btn.classList.add('bg-white/20', 'text-purple-100', 'hover:bg-white/30');
            btn.classList.remove('bg-white', 'text-purple-600', 'shadow-lg', 'transform', 'scale-105');
        }
    });

    // If switching to preview (index 3), update the content
    if (index === 3) {
        updatePreview();
    }
}

function handlePhotoUpload(input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();

        reader.onload = function (e) {
            // Update the preview circle in the form
            const previewDiv = document.getElementById('photo-preview');
            previewDiv.style.backgroundImage = `url('${e.target.result}')`;
            previewDiv.classList.remove('bg-slate-200');

            // Store the base64 image for the CV preview
            window.uploadedPhotoBase64 = e.target.result;
        }

        reader.readAsDataURL(input.files[0]);
    }
}

function addEducation() {
    const container = document.getElementById('education-container');
    const div = document.createElement('div');
    div.className = 'education-item bg-white p-6 rounded-xl shadow-sm border border-slate-200 relative group hover:shadow-md transition-all';
    div.innerHTML = `
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div class="col-span-2">
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Título / Grado</label>
                <input type="text" name="edu_degree[]" class="w-full border-b-2 border-slate-200 focus:border-blue-500 outline-none py-2 text-lg font-semibold text-slate-800 bg-transparent transition-colors" placeholder="Ej: Grado en Ingeniería...">
            </div>
            <div class="col-span-2 md:col-span-1">
                <label class="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Institución</label>
                <input type="text" name="edu_institution[]" class="w-full border-b-2 border-slate-200 focus:border-blue-500 outline-none py-2 text-slate-700 bg-transparent transition-colors" placeholder="Universidad X">
            </div>
            <div class="grid grid-cols-2 gap-4 col-span-2 md:col-span-1">
                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Inicio</label>
                    <input type="text" name="edu_start[]" class="w-full border-b-2 border-slate-200 focus:border-blue-500 outline-none py-2 text-slate-700 bg-transparent transition-colors" placeholder="2018">
                </div>
                <div>
                    <label class="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Fin</label>
                    <input type="text" name="edu_end[]" class="w-full border-b-2 border-slate-200 focus:border-blue-500 outline-none py-2 text-slate-700 bg-transparent transition-colors" placeholder="2022">
                </div>
            </div>
        </div>
        <button type="button" onclick="this.parentElement.remove()" class="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 000-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
            </svg>
        </button>
    `;
    container.appendChild(div);
}

function addLanguage() {
    const container = document.getElementById('languages-container');
    const div = document.createElement('div');
    div.className = 'grid grid-cols-2 gap-4 relative group';
    div.innerHTML = `
        <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Idioma</label>
            <input type="text" name="lang_name[]" class="w-full border-b-2 border-slate-200 focus:border-green-500 outline-none py-2 text-slate-700 bg-transparent transition-colors" placeholder="Idioma">
        </div>
        <div>
            <label class="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1">Nivel</label>
            <select name="lang_level[]" class="w-full border-b-2 border-slate-200 focus:border-green-500 outline-none py-2 text-slate-700 bg-transparent transition-colors">
                <option value="Básico">Básico</option>
                <option value="Intermedio">Intermedio</option>
                <option value="Avanzado">Avanzado</option>
                <option value="Nativo">Nativo</option>
            </select>
        </div>
        <button type="button" onclick="this.parentElement.remove()" class="absolute -right-6 top-6 text-red-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
        </button>
    `;
    container.appendChild(div);
}

function updatePreview() {
    const form = document.getElementById('cv-form');
    const formData = new FormData(form);

    // Personal Info
    document.getElementById('preview-name').textContent = formData.get('name') || 'NOMBRE APELLIDO';
    document.getElementById('preview-email').innerHTML = `<svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/></svg> ${formData.get('email') || 'Email'}`;
    document.getElementById('preview-phone').innerHTML = `<svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/></svg> ${formData.get('phone') || 'Teléfono'}`;
    document.getElementById('preview-location').innerHTML = `<svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/></svg> ${formData.get('location') || 'Ubicación'}`;

    const linkedin = formData.get('linkedin');
    if (linkedin) {
        document.getElementById('preview-linkedin').innerHTML = `<svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg> ${linkedin}`;
        document.querySelector('.linkedin-separator').classList.remove('hidden');
    } else {
        document.getElementById('preview-linkedin').innerHTML = '';
        document.querySelector('.linkedin-separator').classList.add('hidden');
    }

    document.getElementById('preview-summary').textContent = formData.get('professionalSummary') || 'Resumen profesional...';

    // Hard Skills
    const skillsStr = formData.get('skills') || '';
    const skillsContainer = document.getElementById('preview-skills');
    skillsContainer.innerHTML = '';
    if (skillsStr) {
        skillsStr.split(',').forEach(skill => {
            const span = document.createElement('span');
            span.className = 'bg-blue-50 text-blue-700 px-2 py-1 rounded text-xs font-semibold border border-blue-100';
            span.textContent = skill.trim();
            skillsContainer.appendChild(span);
        });
    } else {
        skillsContainer.textContent = '...';
    }

    // Soft Skills
    const softSkillsStr = formData.get('soft_skills') || '';
    const softSkillsContainer = document.getElementById('preview-soft-skills');
    softSkillsContainer.innerHTML = '';
    if (softSkillsStr) {
        softSkillsStr.split(',').forEach(skill => {
            const span = document.createElement('span');
            span.className = 'bg-purple-50 text-purple-700 px-2 py-1 rounded text-xs font-semibold border border-purple-100';
            span.textContent = skill.trim();
            softSkillsContainer.appendChild(span);
        });
    } else {
        softSkillsContainer.textContent = '...';
    }

    // Languages
    const langNames = formData.getAll('lang_name[]');
    const langLevels = formData.getAll('lang_level[]');
    const langContainer = document.getElementById('preview-languages');
    langContainer.innerHTML = '';

    langNames.forEach((name, i) => {
        if (!name) return;
        const li = document.createElement('li');
        li.innerHTML = `<span class="font-semibold text-slate-800">${name}:</span> ${langLevels[i] || ''}`;
        langContainer.appendChild(li);
    });

    // Photo
    const photoContainer = document.getElementById('preview-photo-container');
    const photoImg = document.getElementById('preview-photo-img');
    if (window.uploadedPhotoBase64) {
        photoImg.src = window.uploadedPhotoBase64;
        photoContainer.classList.remove('hidden');
    } else {
        photoContainer.classList.add('hidden');
    }

    // Education
    const eduContainer = document.getElementById('preview-education');
    eduContainer.innerHTML = '';

    const degrees = formData.getAll('edu_degree[]');
    const institutions = formData.getAll('edu_institution[]');
    const starts = formData.getAll('edu_start[]');
    const ends = formData.getAll('edu_end[]');

    degrees.forEach((degree, i) => {
        if (!degree) return;
        const div = document.createElement('div');
        div.className = 'mb-4 pb-4 border-b border-slate-100 last:border-0';
        div.innerHTML = `
            <div class="flex justify-between items-baseline mb-1">
                <h3 class="font-bold text-md text-slate-900">${institutions[i] || ''}</h3>
                <span class="text-sm font-medium text-slate-500 bg-slate-50 px-2 py-0.5 rounded">${starts[i] || ''} - ${ends[i] || ''}</span>
            </div>
            <div class="text-sm text-slate-700 font-medium">${degree}</div>
        `;
        eduContainer.appendChild(div);
    });
}

function printCV() {
    window.print();
}
