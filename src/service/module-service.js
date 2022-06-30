import * as moduleRepository from "../data/module-repository.js";

// get (all modules)
export const getModules = async () => {
  return await moduleRepository.getModules();
};

// get (active module)
export const getActiveModule = async (pId) => {
  return await moduleRepository.getActiveModule();
};
// get (a module)
export const getModule = async (pId) => {
  return await moduleRepository.getModule(pId);
};

// post
export const addModule = async (pModule) => {
  return await moduleRepository.createModule(pModule);
};

// put
export const updateModule = async (pId, pModule) => {
  return await moduleRepository.updateModule(pId, pModule);
};

// delete
export const deleteModule = async (pId) => {
  return await moduleRepository.deleteModule(pId);
};
