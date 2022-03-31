import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { mainAPI } from "../../config";
import { toastTypes } from "../../fixtures";
import { Loading } from "../../pages";
import { useAuthorizationContext } from "./authContext";
const AdminContextAPI = createContext();

export default function AdminContext({ children }) {
  const options = {
    CHANGE_PASSWORD: 0,
    CHANGE_EMAIL: 1,
    CHANGE_USERNAME: 2,
    CHANGE_AVATAR: 3,
    CHANGE_ROLE: 4,
  };
  const [state, setState] = useState({
    accounts: {
      data: [],
      currentPage: 0,
      count: 5,
      documentCount: 0,
      pages: 0,
      loading: true,
    },
    attachments: {
      data: [],
      fetchedPage: [],
      currentPage: 0,
      count: 5,
      documentCount: 0,
      pages: 0,
      loading: true,
    },
    roles: [],
    errors: [],
    messages: [],
    statistics: {
      mostLikePosts: [],
      mostLikeUser: [],
      mostCategories: []
    },
    totalWorkspace: 0,
    totalPost: 0,
    totalUser: 0,
    loading: true,
  });

  const { pushToast } = useAuthorizationContext();
  const [adminAPI, host] =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? [mainAPI.LOCALHOST_ADMIN, mainAPI.LOCALHOST_HOST]
      : [mainAPI.CLOUD_API_ADMIN, mainAPI.CLOUD_HOST];
  const managerAPI =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? mainAPI.LOCALHOST_MANAGER
      : mainAPI.CLOUD_API_MANAGER;
  const staffAPI =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? mainAPI.LOCALHOST_STAFF
      : mainAPI.CLOUD_API_STAFF;

  useEffect(() => {
    getDashBoardOverview();
    getAccountList();
    getRoleList();
    getAttachmentList();
    getMostLikePosts();
    getMostCategory();
  }, []);


  function getAccountList(cb) {
    return axios
      .get(adminAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "account",
        },
      })
      .then((res) => {
        setState((o) => ({
          ...o,
          accounts: {
            ...o.accounts,
            loading: false,
            data: res.data.response,
          }
        }));
        if (typeof cb === 'function') {
          cb(res.data.response);
        }
      })
      .catch((error) => {
        pushToast({
          message: error.message,
          type: toastTypes.ERROR,
        });
        if (typeof cb === 'function') {
          cb([]);
        }
      });
  }
  function getRoleList(cb) {
    return axios
      .get(adminAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "role",
        },
      })
      .then((res) => {
        setState((o) => ({
          ...o,
          roles: res.data.response,
        }));
      })
      .catch(() => pushToast({ message: "Get Role List Failed", type: toastTypes.ERROR }));
  }
  function getAttachmentList(cb) {
    return axios
      .get(managerAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "attachment",
          page: 0,
          count: state.attachments.count,
        },
      })
      .then((res) => {
        setState((o) => ({
          ...o,
          attachments: {
            ...o.attachments,
            loading: false,
            // data: [{
            //   page: 0,
            //   records: res.data.response
            // }],
            data: [
              ...res.data.response
            ],
            fetchedPage: [0],
            currentPage: 0,
            documentCount: res.data.attachmentCount,
            pages: res.data.pages,
          },
        }));
      })
      .catch((error) =>
        pushToast({
          message: error.message,
          type: toastTypes.ERROR,
        })
      );
  }
  function getAttachmentByPage(page, cb) {
    // console.log(page, state.attachments.fetchedPage.indexOf(page));
    // if (!state.attachments.data.some((item) => item.page === page)) {
    if (state.attachments.fetchedPage.indexOf(page) === -1) {
      setState((o) => ({
        ...o,
        attachments: {
          ...o.attachments,
          loading: true
        }
      }));

      return axios
        .get(managerAPI, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          params: {
            view: "attachment",
            page: page,
            count: 5,
          },
        })
        .then((res) => {
          setState((o) => {
            const newData = o.attachments.data.slice();
            newData.splice((page + 1) * o.attachments.count, 0, ...res.data.response);
            return ({
              ...o,
              attachments: {
                ...o.attachments,
                loading: false,
                currentPage: page,
                fetchedPage: [...o.attachments.fetchedPage, page],
                data: newData
              },
            })
          });
          cb(res.data.response);
        })
        .catch((error) => {
          cb([]);
          pushToast({
            message: error.message,
            type: toastTypes.ERROR
          });
        });
    }
  }
  async function getDashBoardOverview() {
    return axios.get(managerAPI, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        view: 'overview'
      }
    }).then(res => {
      setState(o => ({
        ...o,
        totalWorkspace: res.data.totalWorkspace,
        totalPost: res.data.totalPost,
        totalUser: res.data.totalUser
      }));
    }).catch(error => pushToast({
      message: error.message,
      type: toastTypes.ERROR
    }))
  }
  function getMostLikePosts() {
    return axios
      .get(managerAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "mostlikepost",
        },
      })
      .then((res) => {
        setState(oldState => ({
          ...oldState,
          statistics: {
            ...oldState.statistics,
            mostLikePosts: [...res.data.response],
          }
        }));
      })
      .catch((error) => {
        pushToast({ message: error.message, type: toastTypes.ERROR });
      });
  }
  function getMostCategory() {
    return axios
      .get(managerAPI, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          view: "mostcategory",
        },
      })
      .then((res) => {
        setState(oldState => ({
          ...oldState,
          statistics: {
            ...oldState.statistics,
            mostCategories: [...res.data.response],
          }
        }));
      })
      .catch((error) => {
        pushToast({ message: error.message, type: toastTypes.ERROR });
      });
  }
  function createNewAccount(username, email, password, role, cb) {
    return axios
      .post(mainAPI.CLOUD_API_REGISTER, {
        username,
        email,
        password,
        role,
      })
      .then((res) => {
        if (res.status > 199 && res.status < 300) {
          const account = res.data.response;
          setState((oldState) => ({
            ...oldState,
            accounts: { ...oldState, data: [...oldState.accounts.data, account] },
          }));
          pushToast({
            message: 'Add new user successfully',
            type: toastTypes.SUCCESS
          });
          cb({
            message: "Successfully, Add New User",
          });
        }
        else throw new Error("Failed!");
      })
      .catch((error) => {
        setState((o) => ({
          ...o,
          errors: [...o.errors, error.message],
        }));
        pushToast({
          message: 'Add user failed!',
          type: toastTypes.ERROR
        });
        cb({ error: error.message });
      });
  }
  function editUsername(username, accountId, cb) {
    return axios
      .put(
        adminAPI,
        {
          username,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          params: {
            view: "account",
            option: options.CHANGE_USERNAME,
            accountid: accountId,
          },
        }
      )
      .then((res) => {
        if (res.status > 199 && res.status <= 299) {
          setState((o) => ({
            ...o,
            accounts: {
              ...o.accounts,
              data: o.accounts.data.map((account) => {
                if (account._id === accountId)
                  return { ...account, username: username };
                return account;
              })
            },
          }));
          pushToast({
            message: 'Update username successfully',
            type: toastTypes.SUCCESS
          });
          cb({
            message: "Edit username successfully",
          });
        }
        else throw new Error("Update failed");
      })
      .catch((error) => {
        pushToast({
          message: "Cannot edit now !",
          type: toastTypes.ERROR
        })
        cb({ error: error.message });
      });
  }
  function editEmail(email, accountId, cb) {
    return axios
      .put(
        adminAPI,
        {
          email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          params: {
            view: "account",
            option: options.CHANGE_EMAIL,
            accountid: accountId,
          },
        }
      )
      .then((res) => {
        setState((o) => ({
          ...o,
          accounts: {
            ...o.accounts, data: o.accounts.data.map((account) => {
              if (account._id === accountId) return { ...account, email: email };
              return account;
            })
          },
        }));
        pushToast({
          message: "Edit Email successfully",
          type: toastTypes.SUCCESS
        });
      })
      .catch((error) => {
        pushToast({
          message: "Cannot edit now !",
          type: toastTypes.ERROR
        })
        cb(error.message);
      });
  }
  function editPassword(password, accountId, cb) {
    return axios
      .put(
        adminAPI,
        {
          password,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          params: {
            view: "account",
            option: options.CHANGE_PASSWORD,
            accountid: accountId,
          },
        }
      )
      .then((res) => {
        if (res.status > 199 && res.status <= 299) {
          setState((o) => ({
            ...o,
            messages: [...o.messages, "Changed password successfully"],
          }));
          pushToast({
            message: "Edit Password Successfully!",
            type: toastTypes.SUCCESS
          });
          cb({
            message: "Edit Email successfully",
          });
        }
        else throw new Error("Edit password failed!");
      })
      .catch((error) => pushToast({ message: error.message, type: toastTypes.ERROR }));
  }
  function editRole(role, accountId, cb) {
    return axios
      .put(
        adminAPI,
        {
          role,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
          params: {
            view: "account",
            option: options.CHANGE_ROLE,
            accountid: accountId,
          },
        }
      )
      .then((res) => {
        setState((o) => ({
          ...o,
          accounts: {
            ...o.accounts,
            data: o.accounts.data.map((account) => {
              if (account._id === accountId)
                return {
                  ...account,
                  ...res.data.response,
                };
              return account;
            })
          },
        }));
        pushToast({
          message: 'Edit role successfully',
          type: toastTypes.SUCCESS
        });
        cb({
          message: "Edit Role successfully",
        });
      })
      .catch((error) => {
        pushToast({
          message: 'Edit role Failed',
          type: toastTypes.ERROR
        });
        cb({ error: error.message })
      });
  }
  function blockAccount(accountId, cb) { }
  function deleteSingleAttachment(attachmentId, cb) {
    setState(o => {
      return {
        ...o,
        attachments: {
          ...o.attachments,
          data: o.attachments.data.filter(attachment => attachment._id !== attachmentId),
        }
      }
    });
    return axios.delete(managerAPI, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        view: "attachment",
        attachmentid: attachmentId
      }
    }).then(res => {
      pushToast({
        message: 'Deleted Attachment Successfully!',
        type: toastTypes.SUCCESS
      });
      cb({ message: 'get successfully' });
    }).catch(error => {
      pushToast({
        message: error.message,
        type: toastTypes.ERROR
      });
      cb({ error: 'get failed!' });
    });
  }
  async function downloadSingleAttachment(attachmentId) {
    return axios.get(`${host}/api/v1/download`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      params: {
        view: 'singleattachment',
        attachmentid: attachmentId
      },
    }).then(res => {
      const link = document.createElement('a');
      link.href = res.data.response;

      // Append to html link element page
      document.body.appendChild(link);

      // Start download
      link.click();

      // Clean up and remove the link
      link.parentNode.removeChild(link);
    }).catch(err => pushToast({ message: err.message, type: toastTypes.ERROR }));
  }

  const contextValues = {
    ...state,
    createNewAccount,
    editUsername,
    editEmail,
    editPassword,
    editRole,
    getAttachmentByPage,
    deleteSingleAttachment,
    downloadSingleAttachment
  }
  return (
    <AdminContextAPI.Provider
      value={contextValues}
    >
      {children}
    </AdminContextAPI.Provider>
  );
}

export const useAdminContext = () => {
  return useContext(AdminContextAPI);
};
