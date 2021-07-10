import { combineReducers } from "redux";

const INITIAL_STATE = {
  token: null,
  userHabit: null,
  userHabitKey: null,
  userName: null,
  userNameKey: null,
  todayOffset: null,
  todayDate: null,
  lastPostDate: null,
  loading: true,
  auth: false,
  inputUsername: null,
  inputPassword: null,
  recentBlog: null,
  getPosts: null,
  // internet: 'http://baab14ff1f35.ngrok.io',
  internet: 'https://evidentfitness.com',
  getHabits: null,
  setEmail: null,
  setExpo: null,
  setExpoId: null,
  setExpoAccepted: false,
  habitHistory: null,
  exerciseLog: null,
};

const myReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_TOKEN": {
      return {
        ...state,
        // and update the copy with the new value
        token: action.payload,
      };
    }

    case "LOADING": {
      return {
        ...state,
        // and update the copy with the new value
        loading: action.payload,
      };
    }

    case "AUTHORIZE": {
      return {
        ...state,
        // and update the copy with the new value
        auth: action.payload,
      };
    }

    case "UPDATEPROFILEINFO": {
      return {
        ...state,
        // and update the copy with the new value
        userHabit: action.payload["habit"],
        userHabitKey: action.payload["habit_key"],
        userName: action.payload["user"],
        userNameKey: action.payload["user_key"],
        todayOffset: new Date(Date.now()).getTimezoneOffset() * 60 * 1000,
        todayDate: new Date(new Date(Date.now()).getTime() - new Date(Date.now()).getTimezoneOffset() * 60 * 1000).toISOString().split('T')[0],
      };
    }

    case "CHECKLASTPOST": {
      return {
        ...state,
        // and update the copy with the new value
        lastPostDate: new Date(action.payload).toISOString().split("T")[0],
      };
    }

    case "SETUSERNAME": {
      return {
        ...state,
        // and update the copy with the new value
        inputUsername: action.payload,
      };
    }

    case "SETPASSWORD": {
      return {
        ...state,
        // and update the copy with the new value
        inputPassword: action.payload,
      };
    }
    case "LOGOUT": {
      return {
        ...state,
        // and update the copy with the new value
        token: null,
        userHabit: null,
        userHabitKey: null,
        userName: null,
        userNameKey: null,
        todayOffset: null,
        todayDate: null,
        lastPost: null,
        loading: false,
        auth: false,
        inputUsername: null,
        inputPassword: null,
        recentBlog: null,
        getPosts: null,
      };
    }
    case "GETRECENTBLOG": {
      return {
        ...state,
        // and update the copy with the new value
        recentBlog: action.payload,
      };
    }

    case "GETPOSTS": {
      return {
        ...state,
        // and update the copy with the new value
        getPosts: action.payload,
      };
    }

    case "GETHABITS":{
      return {
        ...state,
        // and update the copy with the new value
        getHabits: action.payload,
      };
    
    }

    case 'SETEMAIL':{
      return {
        ...state,
        // and update the copy with the new value
        setEmail: action.payload,
      };
    }

    case 'GETEXPO':{
      return {
        ...state,
        // and update the copy with the new value
        setExpo: action.payload,
        setExpoAccepted: true,

      };
    }

    case 'SETEXPO':{
      return {
        ...state,
        // and update the copy with the new value
        setExpo: action.payload['expoToken'],
        setExpoId: action.payload['id'],
        setExpoAccepted: true,
      };
    }

    case 'UNSETEXPO':{
      return {
        ...state,
        // and update the copy with the new value
        setExpo: null,
        // setExpoId: null,
        setExpoAccepted: false,
      };
    }
    case 'SETHABITHISTORY':{
      return {
        ...state,
        // and update the copy with the new value
        habitHistory: action.payload,
      };
    }

    case 'SETEXERCISELOG':{
      return {
        ...state,
        // and update the copy with the new value
        exerciseLog: action.payload,
      };
    }


    default:
      return state;
  }
};

export default combineReducers({
  enemies: myReducer,
});
