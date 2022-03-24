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
      currentPage: 0,
      count: 5,
      documentCount: 0,
      pages: 0,
      loading: true,
    },
    roles: [],
    errors: [],
    messages: [],
    loading: true,
  });
  const { pushToast } = useAuthorizationContext();
  const [adminAPI, host] =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? [mainAPI.LOCALHOST_ADMIN, mainAPI.LOCALHOST_HOST]
      : [mainAPI.CLOUD_API_ADMIN, mainAPI.CLOUD_HOST];
  const [managerAPI, host2] =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? [mainAPI.LOCALHOST_MANAGER, mainAPI.LOCALHOST_HOST]
      : [mainAPI.CLOUD_API_MANAGER, mainAPI.CLOUD_HOST];

  useEffect(() => {
    getAccountList();
    getRoleList();
    getAttachmentList();
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
      })
      .catch((error) => pushToast({
        message: error.message,
        type: toastTypes.ERROR
      }));
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
      .catch((error) => console.log(error.message));
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
        const account = res.data.response;
        setState((oldState) => ({
          ...oldState,
          accounts: [...oldState.accounts, account],
        }));
        cb({
          message: "successfully, Add New User",
        });
      })
      .catch((error) => {
        setState((o) => ({
          ...o,
          errors: [...o.errors, error.message],
        }));
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
        setState((o) => ({
          ...o,
          accounts: o.accounts.map((account) => {
            if (account._id === accountId)
              return { ...account, username: username };
            return account;
          }),
        }));
        cb({
          message: "Edit username successfully",
        });
      })
      .catch((error) => cb({ error: error.message }));
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
          accounts: o.accounts.map((account) => {
            if (account._id === accountId) return { ...account, email: email };
            return account;
          }),
        }));
        cb({
          message: "Edit Email successfully",
        });
      })
      .catch((error) => cb(error.message));
  }
  function editPassword(password, accountId) {
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
        //  console.log(res.data.response);
        setState((o) => ({
          ...o,
          messages: [...o.messages, "Changed password successfully"],
        }));
      })
      .catch((error) => console.log(error.message));
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
          accounts: o.accounts.map((account) => {
            if (account._id === accountId)
              return {
                ...account,
                ...res.data.response,
              };
            return account;
          }),
        }));
        cb({
          message: "Edit Role successfully",
        });
      })
      .catch((error) => cb({ error: error.message }));
  }
  function blockAccount(accountId, cb) { }
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
            data: [{
              page: 0,
              records: res.data.response
            }],
            // data: [
            //   ...res.data.response
            // ],
            currentPage: 0,
            documentCount: res.data.attachmentCount,
            pages: res.data.pages,
          },
        }));
      })
      .catch((error) => pushToast({
        message: error.message,
        type: toastTypes.ERROR
      }));
  }
  function getAttachmentByPage(page, cb) {
    if (!state.attachments.data.some((item) => item.page === page)) {
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
          setState((o) => ({
            ...o,
            attachments: {
              ...o.attachments,
              loading: false,
              data: [
                ...o.attachments.data,
                {
                  records: res.data.response,
                  page: page,
                },
              ],
              // data: [
              //   ...o.attachments.data, ...res.data.response
              // ],
              currentPage: page,
            },
          }));
        })
        .catch((error) => pushToast({
          message: error.message,
          type: toastTypes.ERROR
        }));
    }
  }
  function deleteSingleAttachment(attachmentId, currentPage, cb) {
    setState(o => {
      return {
        ...o,
        attachments: {
          ...o.attachments,
          // data: o.attachments.data.filter(attachment => attachment._id !== attachmentId)
          data: o.attachments.data.map(attachment => {
            if (attachment.page === currentPage) {
              return {
                ...attachment,
                records: attachment.records.filter(attachment => attachment._id !== attachmentId)
              }
            }
            return attachment;
          })
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
      })
    }).catch(error => pushToast({
      message: error.message,
      type: toastTypes.ERROR
    }))
  }
  function assignMemberToWorkspace() { }
  function assignRoleToAccount() { }
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
      console.log(res.data);
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
  return (
    <AdminContextAPI.Provider
      value={{
        ...state,
        createNewAccount,
        editUsername,
        editEmail,
        editPassword,
        editRole,
        getAttachmentByPage,
        deleteSingleAttachment,
        downloadSingleAttachment
      }}
    >
      {children}
    </AdminContextAPI.Provider>
  );
}

export const useAdminContext = () => {
  return useContext(AdminContextAPI);
};
