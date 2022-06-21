import React, { useEffect, useState } from 'react'
import { default as UUID } from 'node-uuid'
import './styles.css'

import { Card } from '../../components/Card'

function Home() {

  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [user, setUser] = useState({name: '', avatar: ''});

  function handleAddStudent () {
    setStudentId(UUID.v4())
    const newStudent = {
      id: studentId,
      name: studentName,
      time: new Date().toLocaleDateString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    };

    setStudents(prevState => [newStudent, ...prevState])

  }

  useEffect(() => {
    fetch('https://api.github.com/users/leonardolyra')
    .then(response => response.json())
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    })
  }, []);

  return (
    <div className='container'>
      <header>
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt='Foto de perfil'></img>
        </div>
      </header>
      <input 
        type="text" 
        placeholder="Digite um nome..."
        onChange={ e => setStudentName(e.target.value)}
       />
      <button type="button" onClick={handleAddStudent}>Adicionar</button>


      {
        students.map(student => (
        <Card
          key={student.id}
          name={student.name} 
          time={student.time} 
          />
      ))
      }
      
    </div>
  );
}

export default Home

