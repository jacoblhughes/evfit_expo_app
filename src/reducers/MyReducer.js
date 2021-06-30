import { combineReducers } from "redux";

const INITIAL_STATE = {
  token: null,
  userHabit: null,
  userHabitKey: null,
  userName: null,
  userNameKey: null,
  todayOffset: null,
  date: null,
  lastPost: null,
  loading: true,
  auth: false,
  inputUsername: null,
  inputPassword: null,
  recentBlog: null,
  getPosts: null,
  // internet: 'http://b97e56c5c11e.ngrok.io',
  internet: 'https://evidentfitness.com',
  getHabits: null,
  setEmail: null,
  setExpo: null,
  setExpoId: null,
  setExpoAccepted: false,
  habitHistory: null,
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
        todayOffset: new Date().getTimezoneOffset() * 60 * 1000,
        date: new Date(),
      };
    }

    case "CHECKLASTPOST": {
      return {
        ...state,
        // and update the copy with the new value
        lastPost: action.payload,
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
        date: null,
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


    default:
      return state;
  }
};

export default combineReducers({
  enemies: myReducer,
});
