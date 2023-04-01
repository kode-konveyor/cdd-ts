
export const getReturnValueTestData = {
    "getReturnValue": ()=>"1",
    "getReturnValueOther": ()=>"2",
    "getReturnValueSideEffect": ()=>"3",
    "getReturnValueTen": ()=>10,
    "getReturnValueEleven": ()=>11,
}

export const getReturnValueTestDataIndirect = {
    "getReturnValue": ()=> ()=>"1",
    "getReturnValueOther": ()=> ()=>"2",
    "getReturnValueSideEffect": ()=> ()=>"3",
    "getReturnValueTen": ()=> ()=>10,
    "getReturnValueEleven": ()=> ()=>11,
}