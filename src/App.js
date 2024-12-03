
// import React, { useState, useEffect } from 'react';
// import UserProfileForm from './components/UserProfileForm';
// import ProfileDisplay from './components/ProfileDisplay';
// import './App.css';

// const App = () => {
//   // Состояния для профиля, проектов, задач и режима редактирования
//   const [profileData, setProfileData] = useState(null);
//   const [projects, setProjects] = useState([]);
//   const [tasks, setTasks] = useState([]);
//   const [isEditing, setIsEditing] = useState(false); // Режим редактирования

//   // Загружаем данные из localStorage при монтировании
//   useEffect(() => {
//     const savedData = JSON.parse(localStorage.getItem('userProfile'));
//     if (savedData) {
//       setProfileData(savedData);
//     }

//     const savedProjects = JSON.parse(localStorage.getItem('projects')) || [];
//     const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
//     setProjects(savedProjects);
//     setTasks(savedTasks);
//   }, []);

//   // Сохранение данных проектов и задач в localStorage при их изменении
//   useEffect(() => {
//     localStorage.setItem('projects', JSON.stringify(projects));
//   }, [projects]);

//   useEffect(() => {
//     localStorage.setItem('tasks', JSON.stringify(tasks));
//   }, [tasks]);

//   // Функции для добавления проектов и задач
//   const handleAddProject = () => {
//     const projectName = prompt('Enter project name:');
//     if (projectName) {
//       setProjects([...projects, projectName]);
//     }
//   };

//   const handleAddTask = () => {
//     const taskName = prompt('Enter task name:');
//     if (taskName) {
//       setTasks([...tasks, taskName]);
//     }
//   };

//   // Функция для обновления профиля
//   const handleUpdateProfile = (newData) => {
//     setProfileData(newData);
//     localStorage.setItem('userProfile', JSON.stringify(newData)); // Сохранение в localStorage
//     setIsEditing(false); // Выключаем режим редактирования
//   };

//   // Сброс данных профиля
//   const handleResetProfile = () => {
//     setProfileData(null);
//     localStorage.removeItem('userProfile'); // Удаляем профиль из localStorage
//   };

//   return (
//     <div className="app-container">
//       {/* Верхний заголовок */}
//       <header className="header">
//         <h1 className="header-logo">TROOD.</h1>
//         <span className="header-title">Profile</span>
//       </header>

//       {/* Основная структура страницы */}
//       <div className="content">
//         {/* Секция для проектов и задач */}
//         <div className="sidebar">
//           <h2>Projects:</h2>
//           <div className="card-list">
//             {projects.map((project, index) => (
//               <div className="card" key={index}>
//                 {project}
//               </div>
//             ))}
//             <div className="create-item" onClick={handleAddProject}>
//               Create project +
//             </div>
//           </div>

//           <h2>Tasks:</h2>
//           <div className="card-list">
//             {tasks.map((task, index) => (
//               <div className="card" key={index}>
//                 {task}
//               </div>
//             ))}
//             <div className="create-item" onClick={handleAddTask}>
//               Create task +
//             </div>
//           </div>
//         </div>

//         {/* Профильная секция */}
//         <div className="profile-section">
//           {isEditing ? (
//             // Если включен режим редактирования, отображаем форму
//             <UserProfileForm 
//               onUpdateProfile={handleUpdateProfile} 
//               profileData={profileData} 
//             />
//           ) : (
//             // Если выключен режим редактирования, отображаем данные профиля
//             <>
//               {profileData ? (
//                 <ProfileDisplay profileData={profileData} />
//               ) : (
//                 <p>No profile data available. Click "Edit" to add data.</p>
//               )}
//               <button onClick={() => setIsEditing(true)}>Edit Profile</button>
//               {profileData && (
//                 <button onClick={handleResetProfile} className="reset-button">
//                   Reset Profile
//                 </button>
//               )}
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default App;

import React, { useState, useEffect } from 'react';
import UserProfileForm from './components/UserProfileForm';
import ProfileDisplay from './components/ProfileDisplay';
import './App.css';

const App = () => {
  const [profileData, setProfileData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  // Загружаем данные из localStorage при монтировании
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('userProfile'));
    if (savedData) {
      setProfileData(savedData);
    }

    const savedProjects = JSON.parse(localStorage.getItem('projects')) || [];
    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setProjects(savedProjects);
    setTasks(savedTasks);
  }, []);

  // Сохраняем проекты и задачи в localStorage
  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Добавление проектов и задач
  const handleAddProject = () => {
    const projectName = prompt('Enter project name:');
    if (projectName) {
      setProjects([...projects, projectName]);
    }
  };

  const handleAddTask = () => {
    const taskName = prompt('Enter task name:');
    if (taskName) {
      setTasks([...tasks, taskName]);
    }
  };

  // Удаление проектов и задач
  const handleDeleteProject = (index) => {
    setProjects((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDeleteTask = (index) => {
    setTasks((prev) => prev.filter((_, i) => i !== index));
  };

  // Обновление профиля
  const handleUpdateProfile = (newData) => {
    setProfileData(newData);
    localStorage.setItem('userProfile', JSON.stringify(newData));
    setIsEditing(false);
  };

  // Сброс профиля
  const handleResetProfile = () => {
    setProfileData(null);
    localStorage.removeItem('userProfile');
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1 className="header-logo">TROOD.</h1>
        <span className="header-title">Profile</span>
      </header>

      <div className="content">
        <div className="sidebar">
          <h2>Projects:</h2>
          <div className="card-list">
            {projects.map((project, index) => (
              <div className="card" key={index}>
                {project}
                <button
                  onClick={() => handleDeleteProject(index)}
                  className="delete-button"
                  title="Delete project"
                >
                  🗑️
                </button>
              </div>
            ))}
            <div className="create-item" onClick={handleAddProject}>
              Create project +
            </div>
          </div>

          <h2>Tasks:</h2>
          <div className="card-list">
            {tasks.map((task, index) => (
              <div className="card" key={index}>
                {task}
                <button
                  onClick={() => handleDeleteTask(index)}
                  className="delete-button"
                  title="Delete task"
                >
                  🗑️
                </button>
              </div>
            ))}
            <div className="create-item" onClick={handleAddTask}>
              Create task +
            </div>
          </div>
        </div>

        <div className="profile-section">
          {isEditing ? (
            <UserProfileForm onUpdateProfile={handleUpdateProfile} profileData={profileData} />
          ) : (
            <>
              {profileData ? (
                <ProfileDisplay profileData={profileData} />
              ) : (
                <p>No profile data available. Click "Edit" to add data.</p>
              )}
              <button onClick={() => setIsEditing(true)}>Edit Profile</button>
              {profileData && (
                <button onClick={handleResetProfile} className="reset-button">
                  Reset Profile
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;

