// --- TRUY XUẤT CÁC PHẦN TỬ DOM CHÍNH ---
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todoList');
const todoCount = document.getElementById('todo-count');
const filterGroup = document.getElementById('filter-group');
const clearCompletedBtn = document.getElementById('clear-completed');

// Mảng chứa danh sách Todos toàn cục
let todos = JSON.parse(localStorage.getItem('vanilla_todos')) || [];
let currentFilter = 'all'; // Bộ lọc mặc định ban đầu

// --- HÀM 1: TẢI DỮ LIỆU CẤU HÌNH TỪ FILE DATA.JSON ---
async function loadConfig() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) throw new Error("Không thể fetch dữ liệu cấu hình data.json");
        const config = await response.json();
        
        // Đổ dữ liệu cấu hình tĩnh lên DOM
        document.getElementById('app-title').textContent = config.appTitle;
        document.getElementById('app-subtitle').textContent = config.appSubtitle;
        todoInput.placeholder = config.inputPlaceholder;
    } catch (error) {
        console.error("Lỗi tải tệp data.json:", error);
        // Fallback dự phòng nếu lỗi mạng hoặc không có tệp
        document.getElementById('app-title').textContent = "🎯 Todo App";
        todoInput.placeholder = "Nhập công việc cần làm...";
    }
}

// --- HÀM 2: LƯU TRỮ ĐỒNG BỘ VÀO LOCALSTORAGE VÀ CẬP NHẬT GIAO DIỆN ---
function saveAndRender() {
    localStorage.setItem('vanilla_todos', JSON.stringify(todos));
    renderTodos();
}

// --- HÀM 3: RENDER DANH SÁCH TODOS DÙNG HOÀN TOÀN CREATEELEMENT ---
function renderTodos() {
    // Làm rỗng danh sách trước khi vẽ lại
    todoList.innerHTML = '';

    // Lọc todos dựa trên bộ lọc (currentFilter) đang được kích hoạt
    const filteredTodos = todos.filter(todo => {
        if (currentFilter === 'active') return !todo.completed;
        if (currentFilter === 'completed') return todo.completed;
        return true; // Trường hợp 'all'
    });

    // Vẽ từng phần tử Todo dùng createElement (Tuyệt đối không dùng innerHTML cho thẻ li)
    filteredTodos.forEach(todo => {
        // 1. Tạo thẻ <li> bọc ngoài
        const li = document.createElement('li');
        li.className = `list-group-item d-flex justify-content-between align-items-center todo-item fade-in-todo`;
        if (todo.completed) li.classList.add('completed');
        li.setAttribute('data-id', todo.id);

        // 2. Tạo container chứa phần nội dung text hoặc input sửa đổi
        const contentDiv = document.createElement('div');
        contentDiv.className = 'd-flex align-items-center flex-grow-1 me-3 overflow-hidden';

        if (todo.isEditing) {
            // Nếu đang trong trạng thái sửa: Tạo thẻ <input>
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'form-control form-control-sm edit-input';
            input.value = todo.text;
            
            // Tự động focus vào ô input khi kích hoạt chế độ chỉnh sửa
            setTimeout(() => input.focus(), 10);
            
            contentDiv.appendChild(input);
        } else {
            // Nếu trạng thái bình thường: Tạo thẻ <span> chứa text
            const span = document.createElement('span');
            span.className = 'todo-text text-truncate d-block';
            span.textContent = todo.text;
            contentDiv.appendChild(span);
        }

        // 3. Tạo nút xóa hành động (❌)
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn-delete-todo text-danger fw-bold fs-5';
        deleteBtn.textContent = '×';
        deleteBtn.title = 'Xóa công việc này';

        // 4. Lắp ráp các nhánh con vào thẻ <li>
        li.appendChild(contentDiv);
        li.appendChild(deleteBtn);

        // 5. Đẩy thẻ <li> hoàn chỉnh vào cây DOM của #todoList
        todoList.appendChild(li);
    });

    // Cập nhật số lượng đếm công việc còn lại (Chỉ tính những mục chưa completed)
    const itemsLeft = todos.filter(t => !t.completed).length;
    todoCount.textContent = `${itemsLeft} item${itemsLeft !== 1 ? 's' : ''} left`;
}

// --- HÀM 4: KHỞI TẠO VÀ THIẾT LẬP ỦY QUYỀN SỰ KIỆN (EVENT DELEGATION) ---
function setupEvents() {
    // A. XỬ LÝ SỰ KIỆN FORM SUBMIT (THÊM TODO MỚI)
    todoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const textValue = todoInput.value.trim();
        if (!textValue) return;

        const newTodo = {
            id: Date.now(), // Tạo ID độc nhất dựa trên timestamp
            text: textValue,
            completed: false,
            isEditing: false
        };

        todos.push(newTodo);
        todoInput.value = '';
        saveAndRender();
    });

    // B. KỸ THUẬT ỦY QUYỀN SỰ KIỆN (EVENT DELEGATION) TRÊN #todoList
    // Bind duy nhất 1 bộ lắng nghe lên `#todoList`, xử lý mọi sự kiện Click/DbClick của con
    todoList.addEventListener('click', (e) => {
        const li = e.target.closest('li');
        if (!li) return;
        const id = parseInt(li.getAttribute('data-id'));

        // Kịch bản 1: Click trúng nút xóa (×)
        if (e.target.classList.contains('btn-delete-todo')) {
            todos = todos.filter(t => t.id !== id);
            saveAndRender();
            return;
        }

        // Kịch bản 2: Click trúng text để đổi trạng thái Toggle Completed
        if (e.target.classList.contains('todo-text')) {
            todos = todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
            saveAndRender();
        }
    });

    // B2. Lắng nghe sự kiện Double-Click trên #todoList để kích hoạt chế độ sửa (Edit Mode)
    todoList.addEventListener('dblclick', (e) => {
        if (e.target.classList.contains('todo-text')) {
            const li = e.target.closest('li');
            const id = parseInt(li.getAttribute('data-id'));
            
            todos = todos.map(t => t.id === id ? { ...t, isEditing: true } : t);
            renderTodos(); // Chỉ render không lưu LocalStorage để giữ trạng thái sửa tạm thời
        }
    });

    // B3. Lắng nghe sự kiện khi người dùng sửa chữ xong trong ô Input (Enter để lưu, Blur để hủy)
    todoList.addEventListener('keydown', (e) => {
        if (e.target.classList.contains('edit-input') && e.key === 'Enter') {
            const li = e.target.closest('li');
            const id = parseInt(li.getAttribute('data-id'));
            const newValue = e.target.value.trim();

            if (newValue) {
                todos = todos.map(t => t.id === id ? { ...t, text: newValue, isEditing: false } : t);
                saveAndRender();
            } else {
                // Nếu xóa hết chữ, tự động coi như hành động xóa Todo
                todos = todos.filter(t => t.id !== id);
                saveAndRender();
            }
        }
    });

    // Nếu người dùng click ra ngoài khu vực đang chỉnh sửa (Blur) → Tự động thoát chế độ sửa
    todoList.addEventListener('focusout', (e) => {
        if (e.target.classList.contains('edit-input')) {
            const li = e.target.closest('li');
            const id = parseInt(li.getAttribute('data-id'));
            
            todos = todos.map(t => t.id === id ? { ...t, isEditing: false } : t);
            renderTodos();
        }
    });

    // C. XỬ LÝ CHUYỂN ĐỔI BỘ LỌC TẠI FOOTE CONTROL (FILTER LOGIC)
    filterGroup.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-filter')) {
            // Gỡ class active của nút cũ, thêm vào nút vừa bấm
            document.querySelectorAll('.btn-filter').forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');

            currentFilter = e.target.getAttribute('data-filter');
            renderTodos();
        }
    });

    // D. CHỨC NĂNG CLEAR COMPLETED (XÓA TOÀN BỘ MỤC ĐÃ HOÀN THÀNH)
    clearCompletedBtn.addEventListener('click', () => {
        const hasCompleted = todos.some(t => t.completed);
        if (!hasCompleted) return;

        if (confirm("Bạn có chắc chắn muốn dọn dẹp sạch toàn bộ các đầu việc đã hoàn thành?")) {
            todos = todos.filter(t => !t.completed);
            saveAndRender();
        }
    });
}

// --- KHỞI ĐỘNG HỆ THỐNG KHI TẢI XONG TRANG WEB ---
document.addEventListener('DOMContentLoaded', () => {
    loadConfig();     // Nạp cấu hình từ tệp data.json
    setupEvents();    // Kích hoạt lắng nghe các sự kiện
    renderTodos();    // Render danh sách công việc đã lưu từ LocalStorage
});