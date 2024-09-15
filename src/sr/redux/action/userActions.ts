// src/actions/userActions.ts
import {createAsyncThunk} from '@reduxjs/toolkit'
import {fetchUser} from 'app/pages/module/user/user.helpers/fetchUser'
import {rolesArray, UserInterface} from 'sr/constants/User'

// Fetch user data and map by role
export const fetchUserData = createAsyncThunk('user/fetchUserData', async (payload: any) => {
  // Fetch all users with the "getAll: true" option
  const {results} = await fetchUser({getAll: true})

  // Initialize a role-based user map with only two keys: QA and FA
  const userRoleMap: Record<string, UserInterface[]> = {
    QA: [],
    FA: [],
  }

  // Filter and group users by role
  results.results.forEach((user: UserInterface) => {
    // Push users with SuperAdmin or QA role to the QA array
    if (user.role === 'SuperAdmin' || user.role === 'QA') {
      userRoleMap.QA.push(user)
    }

    // Push users with FA or SuperAdmin role to the FA array
    if (user.role === 'SuperAdmin' || user.role === 'FA') {
      userRoleMap.FA.push(user)
    }
  })

  // Return the mapped result
  return {
    userRoleMap, // Users grouped by QA and FA roles
  }
})
