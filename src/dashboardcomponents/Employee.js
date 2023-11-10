import React,{useState,useEffect} from 'react'
import Navbar from '../Utils/Navbar.js';
import Sidebar from '../Utils/Sidebar.js';
import SharedGrid from './SharedGrid.jsx';
import Menu from '../Utils/Menu.jsx';
        import { BsPerson } from 'react-icons/bs';
        import { Button } from 'primereact/button';
import { makeApiRequest } from '../redux/slice/addUserSlice.jsx';
import { useDispatch } from 'react-redux';
import { fetchUsers } from '../redux/slice/userSlice.jsx';
import ReusableDialog from '../Utils/ReusableDialog.jsx';
import YourComponent from './YourComponent.jsx';
function Employee() {
  const token = localStorage.getItem('token');
  const [reportOptions, setreportOptions] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedreport, setSelectedreport] = useState(null)
  const dispatch=useDispatch();
   const [formData, setFormData] = useState({
    user_id: "",
      attitude_behaviour: "",
  collaboration_communication: "",
  transparent_empathize: "",
  trust_verify: "",
  team_work: "",
  act_now_iterate_later: "",
  average_working_hours: "",
  punctuality_100_percent: "",
  other_efforts: "",
  client_feedback: "",
  leaves: "",
  unannounced_leaves: "",
  missed_meetings: "",
  work_from_home: "",
  short_working_day: "",
  month: ""
  });

  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
  
 
    fetchallusers('http://13.228.165.0/api/users', setreportOptions, requestOptions);
  }, []);
  const fetchallusers = (apiUrl, setState, options) => {
    fetch(apiUrl, options)
      .then((response) => response.json())
      .then((data) => {
        if (data && data.data && Array.isArray(data.data)) {
          setState(data.data);
        }
      })
      .catch((error) => {
        console.error('Error fetching users from API:', error);
      });
  };

  const handleAddUser = (data) => {
    const requestData = {
      method: 'POST',
      url: 'http://13.228.165.0/api/empstore',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      data: data,
    };
  
    dispatch(makeApiRequest(requestData))
    .then((response) => {
      console.log('Response from the API:', response);
  
      if (response.status === 201) {
        console.log('User added successfully.');
        setVisible(false);
      } else {
        console.error('Error: Unexpected response status.');
  
        // Check the response data if needed
        if (response.data) {
          console.error('Error data:', response.data);
        }
      }
    })
    .catch((error) => {
      console.error('Error making API request:', error);
  
      // Check the error response if available
      if (error.response) {
        console.error('Error response:', error.response);
      }
    });
  }
  
const addfields = [
  {
    name: 'user_id',
    label: 'User',
    type: 'dropdown',
    options: reportOptions.map(option => ({
      label: option.name,
      value: option.id,
    })),
    required: true,
  },
  {
    name: 'attitude_behaviour',
    label: 'Attitude Behaviour',
    type: 'number',
    max:"5",
    min:"0",
    placeholder: '',
    required: true,
  },
  {
    name: 'collaboration_communication',
    label: 'Collaboration Communication',
    type: 'number',
    max:"5",
    min:"0",
    placeholder: '',
    required: true,
  },
  {
    name: 'transparent_empathize',
    label: 'Transparent Empathize',
    type: 'number',
    max:"2",
    min:"0",
    placeholder: '',
    required: true,
  },
  {
    name: 'trust_verify',
    label: 'Trust Verify',
    type: 'number',
    max:"2",
    min:"0",
    placeholder: '',
    required: true,
  },
  {
    name: 'team_work',
    label: 'Team Work',
    type: 'number',
    max:"4",
    min:"0",
    placeholder: '',
    required: true,
  },
   {
    name: 'act_now_iterate_later',
    label: 'ActNow Iterate Later',
    type: 'number',
    max:"2",
    min:"0",
    placeholder: '',
    required: true,
  },
  {
    name: 'average_working_hours',
    label: 'Average WorkingHours',
    type: 'number',
    max:"15",
    min:"0",
    placeholder: '',
    required: true,
  },  {
    name: 'punctuality_100_percent',
    label: 'Punctuality 100 Percent',
    type: 'number',
    max:"100",
    min:"0",
    placeholder: '',
    required: true,
  },  {
    name: 'other_efforts',
    label: 'Other Efforts',
    type: 'number',
    max:"100",
    min:"0",
    placeholder: '',
    required: true,
  },  
  {
    name: 'client_feedback',
    label: 'Client Feedback',
    type: 'number',
    max:"15",
    min:"0",
    placeholder: '',
    required: true,
  },
  {
    name: 'leaves',
    label: 'Leaves',
    type: 'number',
    max:"30",
    min:"0",
    placeholder: '',
    required: true,
  },
  {
    name: 'unannounced_leaves',
    label: 'Unannounced Leaves',
    type: 'number',
    max:"30",
    min:"0",
    placeholder: '',
    required: true,
  },
  {
    name: 'missed_meetings',
    label: 'Missed Meetings',
    type: 'number',
    max:"100",
    min:"0",
    placeholder: '',
    required: true,
  },
  {
    name: 'work_from_home',
    label: 'Work from Home',
    type: 'number',
    max:"100",
    min:"0",
    placeholder: '',
    required: true,
  },
  {
    name: 'short_working_day',
    label: 'Short Working Day',
    type: 'number',
    max:"100",
    min:"0",
    placeholder: '',
    required: true,
  },
  {
    name: 'month',
    label: 'Month',
    type: 'number',
    max:"12",
    min:"0",
    placeholder: '',
    required: true,
  },

  // "attitude_behaviour": "3",
  // "collaboration_communication": "4",
  // "transparent_empathize": "1",
  // "trust_verify": "1",
  // "team_work": "3",
  // "act_now_iterate_later": "1",
  // "average_working_hours": "14",
  // "punctuality_100_percent": "10",
  // "other_efforts": "10",
  // "client_feedback": "13",
  // "leaves": "28",
  // "unannounced_leaves": "28",
  // "missed_meetings": "10",
  // "work_from_home": "10",
  // "short_working_day": "10",
  // "month": "12"
];

const handleuserChange = (value) => {
  setSelectedreport(value);
  console.log("setSelecteduser",value)
};

  const data = [];

  for (let i = 3; i <= 17; i++) {
    const entry = {
      id: i,
      employeeNumber: `EMP00${i}`,
      employeeName: `Employee ${i}`,
      attendanceDate: '2023-01-07',
      changeType: i % 2 === 0 ? 'In' : 'Out',
      status: i % 3 === 0 ? 'Approved' : 'Pending',
      approval:   <BsPerson />,
      addedOn: `2023-01-07 ${(i % 12) + 1}:${(i % 60).toString().padStart(2, '0')} ${i < 12 ? 'AM' : 'PM'}`,
      action: '...'
    };
    
    data.push(entry);
  }
  const PayrollColumns = [
    { field: 'employeeNumber', header: 'EMPLOYEE#' },
    { field: 'employeeName', header: 'EMPLOYEE' },
    { field: 'attendanceDate', header: 'ATTENDENCE DATE' },
    { field: 'changeType', header: 'CHANGE TYPE' },
    { field: 'status', header: 'STATUS' },
    { field: 'approval', header: 'APPROVALS' },
    { field: 'addedOn', header: 'ADDED ON' },
  
   
  ];
  return (
    <div>
         <Navbar/>
      <Sidebar/>
      <h1 style={{marginRight:"960px",paddingTop: "32px",paddingBottom:"10px" }}>Employee</h1>
     <Menu/>
  {/* <YourComponent/> */}
     <div className="department-container">
      <div className="departbutton">
          <Button
            label="Add Employee"
            icon="pi pi-plus"
            onClick={() => setVisible(true)}
          />
        </div>
        </div>
        <ReusableDialog
      width="50vw"
       height="85vh"
        title="Add User"
        visible={visible}
        onHide={() => setVisible(false)}
        fields={addfields}
        onSubmit={handleAddUser}
        buttonLabel="Add" 
       
        onuserChange={handleuserChange}
        buttonStyle={{ marginTop: '15px',float:"right" }}
        // onChange={(e) => setSelectedProject(e.value)}
      />
     <SharedGrid data={data} columns={PayrollColumns}/>
</div>
    
  )
}

export default Employee
