// import React, { useState, useEffect } from 'react';
// import './UserProfileForm.css'; // Подключите CSS-файл

// const UserProfileForm = ({ onUpdateProfile, profileData, onResetProfile }) => {
//   // Инициализация данных профиля из localStorage или переданных пропсов
//   const savedProfileData = JSON.parse(localStorage.getItem('userProfile')) || profileData;

//   const [formData, setFormData] = useState(savedProfileData || { name: '', lastName: '', jobTitle: '', phone: '', address: '', visibility: 'private', avatar: '', interests: [], links: [] });
//   const [originalData, setOriginalData] = useState(savedProfileData || { name: '', lastName: '', jobTitle: '', phone: '', address: '', visibility: 'private', avatar: '', interests: [], links: [] });
//   const [errors, setErrors] = useState({});

//   // Обработчик изменения полей
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Валидация данных
//   const validateForm = () => {
//     let newErrors = {};

//     // Валидация имени
//     if (!formData.name || formData.name.length < 2 || formData.name.length > 50 || !/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(formData.name)) {
//       newErrors.name = 'Имя должно быть от 2 до 50 символов и содержать только буквы и пробелы.';
//     }

//     // Валидация фамилии
//     if (!formData.lastName || formData.lastName.length < 2 || formData.lastName.length > 50 || !/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(formData.lastName)) {
//       newErrors.lastName = 'Фамилия должна быть от 2 до 50 символов и содержать только буквы и пробелы.';
//     }

//     // Валидация телефона
//     if (!formData.phone || !/^\+[\d]{10,15}$/.test(formData.phone)) {
//       newErrors.phone = 'Номер телефона должен быть в формате +<код страны><номер>, от 10 до 15 символов.';
//     }

//     // Валидация ссылки
//     if (formData.links && formData.links.length > 0) {
//       formData.links.forEach((link, index) => {
//         if (!/^https?:\/\/\S+$/.test(link.link)) {
//           newErrors[`link-${index}`] = 'Ссылка должна быть валидной (начинаться с http:// или https://).';
//         }
//       });
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Обработчик загрузки аватара
//   const handleAvatarUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
//       if (!validTypes.includes(file.type)) {
//         alert('Недопустимый формат файла. Разрешены только .jpg, .jpeg, .png.');
//         return;
//       }
//       if (file.size > 5 * 1024 * 1024) {
//         alert('Размер файла не должен превышать 5 MB.');
//         return;
//       }
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData({ ...formData, avatar: reader.result });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Добавление интересов
//   const handleAddInterest = () => {
//     const newInterest = prompt('Введите новый интерес');
//     if (newInterest && newInterest.length <= 30 && /^[a-zA-Zа-яА-ЯёЁ0-9\s,.]+$/.test(newInterest)) {
//       setFormData((prevState) => ({
//         ...prevState,
//         interests: [...(prevState.interests || []), newInterest],
//       }));
//     }
//   };

//   // Добавление ссылок
//   const handleAddLink = () => {
//     const siteName = prompt('Введите название сайта');
//     const link = prompt('Введите URL');
//     if (siteName && link && /^https?:\/\/\S+$/.test(link)) {
//       setFormData((prevState) => ({
//         ...prevState,
//         links: [...(prevState.links || []), { siteName, link }],
//       }));
//     }
//   };

//   // Сохранение изменений
//   const handleSave = () => {
//     if (validateForm()) {
//       localStorage.setItem('userProfile', JSON.stringify(formData));
//       onUpdateProfile(formData);
//       setOriginalData(formData); // Обновляем originalData после сохранения
//     }
//   };

//   // Отмена изменений
//   const handleCancel = () => {
//     setFormData(originalData);  // Возвращаем данные к исходному состоянию
//   };

//   return (
//     <div className="user-profile-form">
//       <div className="avatar-upload">
//         <label htmlFor="avatarInput" className="avatar-label">
//           <div className="avatar-placeholder">
//             {formData.avatar ? (
//               <img src={formData.avatar} alt="Avatar" className="avatar-preview" />
//             ) : (
//               <span className="avatar-icon">📷</span>
//             )}
//           </div>
//         </label>
//         <input
//           type="file"
//           id="avatarInput"
//           accept="image/*"
//           onChange={handleAvatarUpload}
//           style={{ display: 'none' }}
//         />
//       </div>

//       <div className="form-group">
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={formData.name}
//           onChange={handleChange}
//         />
//         {errors.name && <span className="error">{errors.name}</span>}
//       </div>

//       <div className="form-group">
//         <input
//           type="text"
//           name="lastName"
//           placeholder="Lastname"
//           value={formData.lastName}
//           onChange={handleChange}
//         />
//         {errors.lastName && <span className="error">{errors.lastName}</span>}
//       </div>

//       <div className="form-group">
//         <input
//           type="text"
//           name="jobTitle"
//           placeholder="Job Title"
//           value={formData.jobTitle || ''}
//           onChange={handleChange}
//         />
//       </div>

//       <div className="form-group">
//         <input
//           type="text"
//           name="phone"
//           placeholder="Phone"
//           value={formData.phone || ''}
//           onChange={handleChange}
//         />
//         {errors.phone && <span className="error">{errors.phone}</span>}
//       </div>

//       <div className="form-group">
//         <input
//           type="text"
//           name="address"
//           placeholder="Address"
//           value={formData.address || ''}
//           onChange={handleChange}
//         />
//       </div>

//       <div className="form-group visibility-group">
//         <span>Show your profile in Launchpad?</span>
//         <label>
//           <input
//             type="radio"
//             name="visibility"
//             value="private"
//             checked={formData.visibility === 'private'}
//             onChange={handleChange}
//           />
//           Private
//         </label>
//         <label>
//           <input
//             type="radio"
//             name="visibility"
//             value="public"
//             checked={formData.visibility === 'public'}
//             onChange={handleChange}
//           />
//           Public
//         </label>
//       </div>

//       <div className="form-group">
//         <span>The scopes of your interest:</span>
//         <div className="tags-container">
//           {(formData.interests || []).map((interest, index) => (
//             <span key={index} className="tag">
//               {interest}
//             </span>
//           ))}
//           <button className="add-button" onClick={handleAddInterest}>+</button>
//         </div>
//       </div>

//       <div className="form-group">
//         <span>Your links:</span>
//         <div className="links-container">
//           {(formData.links || []).map((link, index) => (
//             <div key={index} className="link-item">
//               <span>{link.siteName}</span>: <a href={link.link} target="_blank" rel="noopener noreferrer">{link.link}</a>
//             </div>
//           ))}
//           <button className="add-button" onClick={handleAddLink}>+</button>
//         </div>
//       </div>

//       <div className="form-actions">
//         <button onClick={handleSave} className="save-button">Save</button>
//         <button onClick={handleCancel} className="cancel-button">Cancel</button>
//       </div>
//     </div>
//   );
// };

// export default UserProfileForm;
import React, { useState, useEffect } from 'react';
import './UserProfileForm.css'; // Подключите CSS-файл
import { FaTrashAlt } from 'react-icons/fa'; // Иконка корзины (можно установить через npm install react-icons)

const UserProfileForm = ({ onUpdateProfile, profileData, onResetProfile }) => {
  const savedProfileData = JSON.parse(localStorage.getItem('userProfile')) || profileData;

  const [formData, setFormData] = useState(savedProfileData || { name: '', lastName: '', jobTitle: '', phone: '', address: '', visibility: 'private', avatar: '', interests: [], links: [] });
  const [originalData, setOriginalData] = useState(savedProfileData || { name: '', lastName: '', jobTitle: '', phone: '', address: '', visibility: 'private', avatar: '', interests: [], links: [] });
  const [errors, setErrors] = useState({});
  const [isSaved, setIsSaved] = useState(false); // Состояние, чтобы скрыть кнопки после сохранения

  // Обработчик изменения полей
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Валидация данных
  const validateForm = () => {
    let newErrors = {};

    // Валидация имени
    if (!formData.name || formData.name.length < 2 || formData.name.length > 50 || !/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(formData.name)) {
      newErrors.name = 'Имя должно быть от 2 до 50 символов и содержать только буквы и пробелы.';
    }

    // Валидация фамилии
    if (!formData.lastName || formData.lastName.length < 2 || formData.lastName.length > 50 || !/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(formData.lastName)) {
      newErrors.lastName = 'Фамилия должна быть от 2 до 50 символов и содержать только буквы и пробелы.';
    }

    // Валидация телефона
    if (!formData.phone || !/^\+[\d]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Номер телефона должен быть в формате +<код страны><номер>, от 10 до 15 символов.';
    }

    // Валидация ссылки
    if (formData.links && formData.links.length > 0) {
      formData.links.forEach((link, index) => {
        if (!/^https?:\/\/\S+$/.test(link.link)) {
          newErrors[`link-${index}`] = 'Ссылка должна быть валидной (начинаться с http:// или https://).';
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Обработчик загрузки аватара
  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        alert('Недопустимый формат файла. Разрешены только .jpg, .jpeg, .png.');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        alert('Размер файла не должен превышать 5 MB.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, avatar: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Добавление интересов
  const handleAddInterest = () => {
    const newInterest = prompt('Введите новый интерес');
    if (newInterest && newInterest.length <= 30 && /^[a-zA-Zа-яА-ЯёЁ0-9\s,.]+$/.test(newInterest)) {
      setFormData((prevState) => ({
        ...prevState,
        interests: [...(prevState.interests || []), newInterest],
      }));
    }
  };

  // Добавление ссылок
  const handleAddLink = () => {
    const siteName = prompt('Введите название сайта');
    const link = prompt('Введите URL');
    if (siteName && link && /^https?:\/\/\S+$/.test(link)) {
      setFormData((prevState) => ({
        ...prevState,
        links: [...(prevState.links || []), { siteName, link }],
      }));
    }
  };

  // Сохранение изменений
  const handleSave = () => {
    if (validateForm()) {
      localStorage.setItem('userProfile', JSON.stringify(formData));
      onUpdateProfile(formData);
      setOriginalData(formData); // Обновляем originalData после сохранения
      setIsSaved(true); // Скрыть кнопки после сохранения
    }
  };

  // Удаление профиля
  const handleDeleteProfile = () => {
    localStorage.removeItem('userProfile');
    onResetProfile(); // Очищаем профиль
    setFormData({ name: '', lastName: '', jobTitle: '', phone: '', address: '', visibility: 'private', avatar: '', interests: [], links: [] });
    setIsSaved(false); // Восстанавливаем состояние
  };

  // Отмена изменений
  const handleCancel = () => {
    setFormData(originalData);  // Возвращаем данные к исходному состоянию
  };

  return (
    <div className="user-profile-form">
      <div className="avatar-upload">
        <label htmlFor="avatarInput" className="avatar-label">
          <div className="avatar-placeholder">
            {formData.avatar ? (
              <img src={formData.avatar} alt="Avatar" className="avatar-preview" />
            ) : (
              <span className="avatar-icon">📷</span>
            )}
          </div>
        </label>
        <input
          type="file"
          id="avatarInput"
          accept="image/*"
          onChange={handleAvatarUpload}
          style={{ display: 'none' }}
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <input
          type="text"
          name="lastName"
          placeholder="Lastname"
          value={formData.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <span className="error">{errors.lastName}</span>}
      </div>

      <div className="form-group">
        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          value={formData.jobTitle || ''}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone || ''}
          onChange={handleChange}
        />
        {errors.phone && <span className="error">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address || ''}
          onChange={handleChange}
        />
      </div>

      <div className="form-group visibility-group">
        <span>Show your profile in Launchpad?</span>
        <label>
          <input
            type="radio"
            name="visibility"
            value="private"
            checked={formData.visibility === 'private'}
            onChange={handleChange}
          />
          Private
        </label>
        <label>
          <input
            type="radio"
            name="visibility"
            value="public"
            checked={formData.visibility === 'public'}
            onChange={handleChange}
          />
          Public
        </label>
      </div>

      <div className="form-group">
        <span>The scopes of your interest:</span>
        <div className="tags-container">
          {(formData.interests || []).map((interest, index) => (
            <span key={index} className="tag">
              {interest}
            </span>
          ))}
          <button className="add-button" onClick={handleAddInterest}>+</button>
        </div>
      </div>

      <div className="form-group">
        <span>Your links:</span>
        <div className="links-container">
          {(formData.links || []).map((link, index) => (
            <div key={index}>
              <a href={link.link} target="_blank" rel="noopener noreferrer">{link.siteName}</a>
            </div>
          ))}
          <button className="add-button" onClick={handleAddLink}>+</button>
        </div>
      </div>

      <div className="actions">
        <button onClick={handleSave}>Save</button>
        <button onClick={handleCancel}>Cancel</button>
        {isSaved && (
          <div className="actions-after-save">
            <FaTrashAlt onClick={handleDeleteProfile} className="delete-icon" />
            <button onClick={() => window.location.reload()}>Return</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfileForm;
