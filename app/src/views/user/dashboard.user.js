document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const userListContainer = document.getElementById('app');

    // Fetch all users
    const fetchAllUsers = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/user');
            const users = await response.json();
            
            // Render user list
            renderUserList(users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Render user list
    const renderUserList = (users) => {
        userListContainer.innerHTML = '';

        if (users.length === 0) {
            userListContainer.innerHTML = '<p>No users found.</p>';
            return;
        }

        const userList = document.createElement('ul');
        users.forEach((user) => {
            const listItem = document.createElement('li');
            listItem.textContent = user.email; 
            userList.appendChild(listItem);
        });

        userListContainer.appendChild(userList);
    };

    // Initial fetch
    fetchAllUsers();
});