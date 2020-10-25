import { UserProfile } from "../../model/user"
import { SET_ALKASH } from "../actionTypes"

export const setAlkashAction = (profile: UserProfile) => {
  return {
    type: SET_ALKASH,
    payload: profile,
  }
}
