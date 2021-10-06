import './App.css';
import { useState, useEffect } from 'react';
import {
    collection,
    getDocs,
    addDoc,
    doc,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore';
import { db } from './firbase-config';

function App() {
    const [isUpdate, setIsUpdate] = useState(false);
    const [isCreate, setIsCreate] = useState(false);
    const [isDelete, setIsDelete] = useState(false);
    const [userId, setUserId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [user, setUser] = useState([]);
    const userCollectionRef = collection(db, 'users');

    useEffect(() => {
        async function getData() {
            const data = await getDocs(userCollectionRef);

            setUser(data.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        }
        getData();

        console.log(user);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUpdate, isCreate, isDelete]);

    const createUser = async () => {
        await addDoc(userCollectionRef, { name, email });
        setName('');
        setEmail('');
        setIsUpdate(false);
        setIsCreate(true);
        console.log('Data Added.');
    };

    const editUser = (user) => {
        setEmail(user.email);
        setName(user.name);
        setIsUpdate(true);
        setUserId(user.id);
    };

    const updateUser = async (userId) => {
        const userUpdateRef = doc(db, 'users', userId);

        await updateDoc(userUpdateRef, { name, email });
        setName('');
        setEmail('');
        setIsUpdate(false);
        console.log('Data Updated.');
    };

    const deleteUser = async (userId) => {
        const userUpdateRef = doc(db, 'users', userId);
        await deleteDoc(userUpdateRef);
        setIsDelete(true);
    };

    return (
        <div className="App">
            <h1>Firebase CRUD App</h1>
            <div className="row">
                <div className="col-4 offset-4 mt-3">
                    <input
                        className="form-control mb-2"
                        type="text"
                        placeholder="name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                    />
                    <input
                        className="form-control mb-2"
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {!isUpdate && (
                        <button
                            className="btn btn-info mt-2"
                            onClick={createUser}
                        >
                            Create User
                        </button>
                    )}
                    {isUpdate && (
                        <button
                            className="btn btn-success"
                            onClick={() => updateUser(userId)}
                        >
                            Update User
                        </button>
                    )}
                </div>
            </div>
            {user.map((u) => (
                <div
                    key={u.id}
                    style={{
                        display: 'flex',
                        border: '0.3px solid gray',
                        borderRadius: '4px',
                        justifyContent: 'space-between',
                        padding: '10px',
                        margin: '5px 10%',
                    }}
                >
                    <h3>
                        Name: {u.name} || Email: {u.email}
                    </h3>
                    <div>
                        <button
                            className="btn btn-warning btn-sm mx-1"
                            onClick={() => editUser(u)}
                        >
                            Edit
                        </button>
                        <button
                            className="btn btn-danger btn-sm mx-1"
                            onClick={() => deleteUser(u.id)}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default App;
