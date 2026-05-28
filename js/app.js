document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('student-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const studentsList = document.getElementById('students-list');

    let students = JSON.parse(localStorage.getItem('students')) || [];

    renderStudents();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newStudent = {
            id: Date.now(),
            name: nameInput.value.trim(),
            email: emailInput.value.trim()
        };

        students.push(newStudent);
        saveAndRender();
        form.reset();
        nameInput.focus();
    });

    studentsList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const id = parseInt(e.target.dataset.id);
            students = students.filter(student => student.id !== id);
            saveAndRender();
        }
    });

    function saveAndRender() {
        localStorage.setItem('students', JSON.stringify(students));
        renderStudents();
    }

    function renderStudents() {
        studentsList.innerHTML = '';
        
        if (students.length === 0) {
            studentsList.innerHTML = '<tr><td colspan="3" class="empty-msg">No students added yet.</td></tr>';
            return;
        }

        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${escapeHtml(student.name)}</td>
                <td>${escapeHtml(student.email)}</td>
                <td><button class="delete-btn" data-id="${student.id}">Delete</button></td>
            `;
            studentsList.appendChild(row);
        });
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
});