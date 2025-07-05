import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const [medications, setMedications] = useState([]);
  const [name, setName] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('');

  const fetchMedications = async () => {
    const res = await fetch(`https://medicine-2-yidh.onrender.com/medications/user/${user.id}`);
    const data = await res.json();
    setMedications(data);
  };

  const addMedication = async () => {
    const res = await fetch('https://medicine-2-yidh.onrender.com/medications/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.id, name, dosage, frequency })
    });
    if (res.ok) {
      setName('');
      setDosage('');
      setFrequency('');
      fetchMedications();
    }
  };

  useEffect(() => {
    fetchMedications();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Welcome, {user.username} ({user.role})</h2>

      <h3>Add Medication</h3>
      <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} /><br />
      <input placeholder="Dosage" value={dosage} onChange={e => setDosage(e.target.value)} /><br />
      <input placeholder="Frequency" value={frequency} onChange={e => setFrequency(e.target.value)} /><br />
      <button onClick={addMedication}>Add</button>

      <h3>Your Medications</h3>
      <ul>
        {medications.map(med => (
          <li key={med.id}>{med.name} - {med.dosage} - {med.frequency}</li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
