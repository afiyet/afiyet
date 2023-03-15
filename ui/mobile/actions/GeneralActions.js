const types = {
    SET_ONBOARDED: "SET_ONBOARDED"
}

const setOnboarded = (value) => {
    return {
        type: types.SET_ONBOARDED,
        data: value
    }
};

export default {setOnboarded, types};