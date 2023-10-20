import React,{useEffect,useState} from 'react'
import Navbar from '../Utils/Navbar.js';
import Sidebar from '../Utils/Sidebar.js';
import Menu from '../Utils/Menu.jsx';
import SharedGrid from './SharedGrid.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../redux/slice/userSlice.jsx';
import { addDepartment, deleteDepartments, updateDepartments } from '../redux/slice/departmentslice.jsx';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
function Projects() {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.employeedata.data.projects); 
 
  const token = localStorage.getItem('token');
  const [newProject, setNewProject] = useState('');
 
  const [error, setError] = useState(null);
  const [visible, setVisible] = useState(false);
  const [updateVisible, setUpdateVisible] = useState(false);
  const [updateProject, setUpdateProject] = useState('');
  const [ProjectIdToUpdate, setProjectIdToUpdate] = useState(null);
  console.log(projects);
   useEffect(() => {
    if (token) {
      dispatch(
        fetchUsers({
          method: 'GET',
          url: 'http://13.228.165.0/api/projects',
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        })
      );
    }
  }, [dispatch, token]);

  const handleDeleteProject = async (id) => {
  
      const success = await dispatch(deleteDepartments({
      method: 'DELETE',
      url: `http://13.228.165.0/api/project/${id}/delete`,
      headers: {
        'Authorization': `Bearer ${token}` 
      }
    }
    ));
    if (success) {
      console.log(id,success)
      dispatch(
        fetchUsers({
          method: 'GET',
          url: 'http://13.228.165.0/api/projects',
          headers: {
            'Authorization': `Bearer ${token}` 
          }
        })
      );
    } else {
    
    }
  };

  const handleupdateProject = async () => {
    if (ProjectIdToUpdate && updateProject) {
      const success = await dispatch(
        updateDepartments({
          method: 'PUT',
          url: `http://13.228.165.0/api/project/${ProjectIdToUpdate}/update`,
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          data: {
            project: updateProject, // Use the user-input department name
          },
        })
      );

      if (success) {
        dispatch(
          fetchUsers({
            method: 'GET',
            url: 'http://13.228.165.0/api/projects',
            headers: {
              'Authorization': `Bearer ${token}` 
            }
          })
        );
        setUpdateVisible(false);
        // Reset departmentIdToUpdate and updateDepartment
        setProjectIdToUpdate(null);
        setUpdateProject('');
      }
    }
  };
  
    const handleAddProject = async (e) => {
    e.preventDefault()
    try {
      
      const response = await dispatch(
        addDepartment({
          method: 'POST',
          url: 'http://13.228.165.0/api/projectstore',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json', 
          },
          data: {
            project: newProject, 
          }
        })
      );
      console.log(response);

    
      if (response) {
        console.log('Project created successfully:', response);
        dispatch(
          fetchUsers({
            method: 'GET',
            url: 'http://13.228.165.0/api/projects',
            headers: {
              'Authorization': `Bearer ${token}` 
            }
          })
        );
       
        setNewProject(''); 
       
  
       

        setVisible(false);
      }
    } catch (error) {
      console.error('API request failed:', error.message);
      setError('Project creation failed. Please try again.');
    }
  };

  // const handleUpdateDepartment = (id, updatedData) => {
  //   // Call the updateDepartment action with the id and updated data
  //   dispatch(updateDepartment(id, updatedData));
  // };

  if (!projects) {
    // Handle the case where data is not available yet
    return (
      <div>
        <Navbar />
        <Sidebar />
        <h1 style={{ marginRight: "880px", paddingTop: "50px" }}>Projects</h1>
        <Menu />
        <p>Loading...</p>
      </div>
    );
  }
  
  const ProjectColumns = [
    { field: 'id', header: 'ID#' },
    { field: 'project', header: 'Project' },
    //  { field: 'created_at', header: 'created_at ' },
    // { field: 'changeType', header: 'CHANGE TYPE' },
    // { field: 'status', header: 'STATUS' },
    // { field: 'approval', header: 'APPROVALS' },
    // { field: 'addedOn', header: 'ADDED ON' },
    // { field: 'action', header: 'ACTION' },
    
  ];

  return (
    <div>
      <Navbar />
      <Sidebar />
      <h1 style={{ marginRight: "920px", paddingTop: "50px" }}>Projects</h1>
      <Menu />
      <div className="department-container">
        <div className="departbutton">
          <Button
            label="Add Project"
            icon="pi pi-plus"
            onClick={() => setVisible(true)}
          />
        </div>

        <Dialog
          header="Add Project"
          visible={visible}
          style={{ width: '50vw', top: 0, right: 0 }}
          onHide={() => setVisible(false)}
        >
          <form onSubmit={(e) => handleAddProject(e)}>
            <div>
              <p>Add a new Project:</p>
              <input
                type="text"
                placeholder="Project Name"
                required
                value={newProject}
                onChange={(e) => setNewProject(e.target.value)}
              />
              <button type="submit" className='departbtn'>
                Add
              </button>
            </div>
          </form>
        </Dialog>
        <Dialog
        header="Update Project"
        visible={updateVisible}
        style={{ width: '50vw', top: 0, right: 0 }}
        onHide={() => setUpdateVisible(false)}
      >
        <form onSubmit={(e) => {
          e.preventDefault();
          handleupdateProject();
        }}>
          <div>
            <p>Update Project:</p>
            <input
              type="text"
              placeholder="Project Name"
              required
              value={updateProject}
              onChange={(e) => setUpdateProject(e.target.value)}
            />
            <button type="submit" className='departbtn'>
              Update
            </button>
          </div>
        </form>
      </Dialog>
        
      </div>
      <SharedGrid
        data={projects}
        columns={ProjectColumns}
        handleUpdate={(id,previousProject) => {
          setProjectIdToUpdate(id,previousProject);
          setUpdateProject(previousProject.project); 
          setUpdateVisible(true);
        }}
        handleDelete={handleDeleteProject}
      />
    </div>
  );
}

export default Projects
