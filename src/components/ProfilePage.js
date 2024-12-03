// import React, { useState } from 'react';
// import './ProfilePage.css';

// const ProfilePage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     surname: '',
//     jobTitle: '',
//     phone: '',
//     email: '',
//     address: '',
//     pitch: '',
//     visibility: 'Private',
//     interests: [],
//     links: [],
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   return (
//     <div className="profile-page">
//       <div className="sidebar">
//         <div className="projects">
//           <h3>Projects:</h3>
//           <div className="create-item">
//             <span>Create project</span>
//             <button>+</button>
//           </div>
//         </div>
//         <div className="tasks">
//           <h3>Tasks:</h3>
//           <div className="create-item">
//             <span>Create task</span>
//             <button>+</button>
//           </div>
//         </div>
//       </div>

//       <div className="profile-form-container">
//         <div className="avatar-upload">
//           <label htmlFor="avatar-upload">
//             <div className="avatar-placeholder">
//               <span>📷</span>
//             </div>
//           </label>
//           <input type="file" id="avatar-upload" style={{ display: 'none' }} />
//         </div>
//         <form className="profile-form">
//           <input
//             type="text"
//             name="name"
//             value={formData.name}
//             placeholder="Name"
//             onChange={handleInputChange}
//           />
//           <input
//             type="text"
//             name="surname"
//             value={formData.surname}
//             placeholder="Lastname"
//             onChange={handleInputChange}
//           />
//           <input
//             type="text"
//             name="jobTitle"
//             value={formData.jobTitle}
//             placeholder="Job Title"
//             onChange={handleInputChange}
//           />
//           <input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             placeholder="Phone"
//             onChange={handleInputChange}
//           />
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             placeholder="Email"
//             onChange={handleInputChange}
//           />
//           <input
//             type="text"
//             name="address"
//             value={formData.address}
//             placeholder="Address"
//             onChange={handleInputChange}
//           />
//           <textarea
//             name="pitch"
//             value={formData.pitch}
//             placeholder="Pitch"
//             onChange={handleInputChange}
//           ></textarea>
//           <div className="visibility-options">
//             <label>
//               <input
//                 type="radio"
//                 name="visibility"
//                 value="Private"
//                 checked={formData.visibility === 'Private'}
//                 onChange={handleInputChange}
//               />
//               Private
//             </label>
//             <label>
//               <input
//                 type="radio"
//                 name="visibility"
//                 value="Public"
//                 checked={formData.visibility === 'Public'}
//                 onChange={handleInputChange}
//               />
//               Public
//             </label>
//           </div>
//           <div className="additions">
//             <div>
//               <span>The scopes of your interest:</span>
//               <button type="button">+</button>
//             </div>
//             <div>
//               <span>Potential interests:</span>
//               <button type="button">+</button>
//             </div>
//             <div>
//               <span>Your links:</span>
//               <button type="button">+</button>
//             </div>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;
import React, { useState } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    jobTitle: '',
    phone: '',
    email: '',
    address: '',
    pitch: '',
    visibility: 'Private',
    interests: [],
    links: [],
  });

  // Состояния для проектов и задач
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  // Обработчик изменения данных формы
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Обработчик добавления проекта
  const handleAddProject = () => {
    const projectName = prompt('Enter the project name:');
    if (projectName) {
      setProjects((prevProjects) => [...prevProjects, projectName]);
    }
  };

  // Обработчик добавления задачи
  const handleAddTask = () => {
    const taskName = prompt('Enter the task name:');
    if (taskName) {
      setTasks((prevTasks) => [...prevTasks, taskName]);
    }
  };

  // Обработчик удаления проекта
  const handleDeleteProject = (index) => {
    setProjects((prevProjects) => prevProjects.filter((_, i) => i !== index));
  };

  // Обработчик удаления задачи
  const handleDeleteTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  return (
    <div className="profile-page">
      <div className="sidebar">
        <div className="projects">
          <h3>Projects:</h3>
          <div className="create-item">
            <span>Create project</span>
            <button onClick={handleAddProject}>+</button>
          </div>
          <ul>
            {projects.map((project, index) => (
              <li key={index} className="project-item">
                {project}
                <button 
                  onClick={() => handleDeleteProject(index)} 
                  className="delete-button"
                  title="Delete project"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="tasks">
          <h3>Tasks:</h3>
          <div className="create-item">
            <span>Create task</span>
            <button onClick={handleAddTask}>+</button>
          </div>
          <ul>
            {tasks.map((task, index) => (
              <li key={index} className="task-item">
                {task}
                <button 
                  onClick={() => handleDeleteTask(index)} 
                  className="delete-button"
                  title="Delete task"
                >
                  🗑️
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="profile-form-container">
        <div className="avatar-upload">
          <label htmlFor="avatar-upload">
            <div className="avatar-placeholder">
              <span>📷</span>
            </div>
          </label>
          <input type="file" id="avatar-upload" style={{ display: 'none' }} />
        </div>
        <form className="profile-form">
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Name"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="surname"
            value={formData.surname}
            placeholder="Lastname"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="jobTitle"
            value={formData.jobTitle}
            placeholder="Job Title"
            onChange={handleInputChange}
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            placeholder="Phone"
            onChange={handleInputChange}
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            placeholder="Address"
            onChange={handleInputChange}
          />
          <textarea
            name="pitch"
            value={formData.pitch}
            placeholder="Pitch"
            onChange={handleInputChange}
          ></textarea>
          <div className="visibility-options">
            <label>
              <input
                type="radio"
                name="visibility"
                value="Private"
                checked={formData.visibility === 'Private'}
                onChange={handleInputChange}
              />
              Private
            </label>
            <label>
              <input
                type="radio"
                name="visibility"
                value="Public"
                checked={formData.visibility === 'Public'}
                onChange={handleInputChange}
              />
              Public
            </label>
          </div>
          <div className="additions">
            <div>
              <span>The scopes of your interest:</span>
              <button type="button">+</button>
            </div>
            <div>
              <span>Potential interests:</span>
              <button type="button">+</button>
            </div>
            <div>
              <span>Your links:</span>
              <button type="button">+</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
