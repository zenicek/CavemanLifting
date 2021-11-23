// import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';
import { useColorMode, useColorModeValue, HStack } from '@chakra-ui/react';
import 'react-toastify/dist/ReactToastify.css';

import { CavemanContextProvider } from './CavemanContext';

import {
  Dashboard,
  Sidebar,
  SessionForm,
  Gym,
  Profile,
  WorkoutInfo,
} from './components/index';

// import ApiService from './ApiService';

//TODO: App is quite bloated with lots of states - usecontext or redux to define a data flow
function App() {
  // eslint-disable-next-line no-unused-vars
  const [workouts, setWorkouts] = useState([]);
  const [detailsForm, setDetailsForm] = useState('');
  // const [infoAdd, setInfoAdd] = useState(false);
  const [navSize, setSize] = useState('sm');

  // showForm used for displaying 'Add New Session'
  // detialsForm used for 'Add details'
  // infoAdd used to keep track, and update the workout cards on the dashboard

  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('teal.200', 'teal.800');

  //TODO the below can be outsored to the utils folder within helper function
  // const notifyAdd = () =>
  //   toast.info('New session added!', {
  //     position: 'top-right',
  //     autoClose: 1500,
  //     hideProgressBar: true,
  //     closeOnClick: true,
  //     theme: 'dark',
  //   });
  // Toastify notifications for adding workout and details
  // function postWorkout(title, date, notes = '') {
  //   ApiService.postWorkout({ title, date, notes }).then(workout => {
  //     setWorkouts(prevList => {
  //       const newList = [workout, ...prevList];
  //       //I assume that it adds the most recent workout to the front, but then it sorts it backward??? double check
  //       newList.sort((a, b) => sortByDate(b, a));
  //       return newList;
  //     });
  //   });
  //   notifyAdd();
  // }
  // standard API call to POST workout
  //TODO this now lives in context to add routines info to the workout, only post request which can be done in the context useEffect that monitors the change of userData state
  // function addInfo(body, id) {
  //   ApiService.addInfo(body, id).then(workout => {
  //     //TODO set workout should be simpler than all that logic, this can be outsourced.
  //     setWorkouts(prevList => {
  //       const filteredArr = prevList.filter(
  //         workoutCard => workout._id !== workoutCard._id
  //       );
  //       console.log(filteredArr);
  //       const newList = [workout, ...filteredArr];
  //       // is needed (?) addInfo watches state

  //       newList.sort((a, b) => sortByDate(b, a));
  //       console.log(newList);
  //       setInfoAdd(!infoAdd);

  //       return newList;
  //       // This function call a PUT request to update the selected card with a new workout
  //       // based on the selected cards ID
  //       // Then filters & replaces the edited workout card to insure consistency
  //     });
  //   });
  // }

  // function toggleForm() {
  //   setShowForm(!showForm);
  // }
  // Boolean flag for showing the 'Create New Session' modal form.

  function toggleDetailsForm(id = '') {
    id.length ? setDetailsForm(id) : setDetailsForm('');
  }
  // Displays the add details form modal for a card, only if that card has an
  // ID property, theoretically they all SHOULD have but this just double checks

  //TODO a lot of props drilling here needs to be managed centrally
  return (
    <CavemanContextProvider>
      <HStack
        p='0'
        bg={bgColor}
      >
        <ToastContainer />
        {/* Used as a container for any and all Toasts (toast notification naming convention) */}

        {/*NOW:
          SessionForm - top lvl modal as it can be accessed with every component
          SessionDetails - is now available only within Dashboard component
          Modal state management is perform via appState in CavemanContext
        */}
        <SessionForm />

        <HStack
          m='0 !important'
          w='100%'
        >
          <Router>
            <Sidebar
              //postWorkout={postWorkout}
              //move colorMode to global state
              toggleColorMode={toggleColorMode}
            />
            {/* Router logic is give to the sidebar^ while actual routing happens below */}
            <Routes>
              <Route
                path='/dashboard'
                element={
                  <Dashboard
                    navSize={navSize}
                    toggleDetailsForm={toggleDetailsForm}
                    workouts={workouts}
                  />
                }
              />
              <Route
                path='/profile'
                element={
                  <Profile
                    workouts={workouts}
                    userData='{}'
                    navSize={navSize}
                  />
                }
              />
              <Route
                path='/workouts'
                element={<WorkoutInfo />}
              />
              <Route
                path='/gyms'
                element={<Gym navSize={navSize} />}
              />
            </Routes>
          </Router>
        </HStack>
      </HStack>
    </CavemanContextProvider>
  );
}

// function sortByDate(a, b) {
//   // Function to sort array of workouts by date, highest being first
//   // TODO: implement calendar stopper for current day
//   const dateOne = new Date(a.date).getTime();
//   const datetwo = new Date(b.date).getTime();
//   return dateOne - datetwo;
// }

export default App;
