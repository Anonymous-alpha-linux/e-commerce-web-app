import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";
import { mainAPI } from "../../config";
import { Loading } from "../../pages";
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
    accounts: [],
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
  const [adminAPI, host] =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? [mainAPI.LOCALHOST_ADMIN, mainAPI.LOCALHOST_HOST]
      : [mainAPI.CLOUD_API_ADMIN, mainAPI.CLOUD_HOST];
  const managerAPI =
    process.env.REACT_APP_ENVIRONMENT === "development"
      ? mainAPI.LOCALHOST_MANAGER
      : mainAPI.CLOUD_API_MANAGER;

  useEffect(() => {
    getAccountList();
    getRoleList();
    getAttachmentListQAM();
    // getAttachmentByPage(1);
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
          accounts: res.data.response,
        }));
      })
      .catch((error) => console.log(error.message));
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
        //  console.log(res.data.response);
        setState((o) => ({
          ...o,
          messages: [...o.messages, "Changed password successfully"],
        }));
        cb({
          message: "Edit Email successfully",
        });
      })
      .catch((error) => cb(error.message));
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
  function blockAccount(accountId, cb) {}

  function getAttachmentListQAM(cb) {
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
        console.log(res.data);
        setState((o) => ({
          ...o,
          attachments: {
            data: [
              {
                page: 0,
                records: res.data.response,
              },
            ],
            currentPage: 0,
            documentCount: res.data.attachmentCount,
            pages: res.data.pages,
          },
        }));
      })
      .catch((error) => console.log(error.message));
  }
  function getAttachmentByPage(page, cb) {
    if (!state.attachments.data.some((item) => item.page === page)) {
      setState((o) => ({
        ...o,
        loading: true,
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
          console.log(res.data);
          setState((o) => ({
            ...o,
            loading: false,
            attachments: {
              ...o.attachments,
              data: [
                ...o.attachments.data,
                {
                  records: res.data.response,
                  page: page,
                },
              ],
              currentPage: page,
            },
          }));
        })
        .catch((error) => console.log(error.message));
    }
  }
  function downloadAttachmentQAM(attachmentId) {
    return axios
      .get(`${managerAPI}/api/v1/download`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        params: {
          attachmentid: attachmentId,
        },
      })
      .then((res) => {
        const link = document.createElement("a");
        link.href = res.data.response;

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
      })
      .catch((err) => console.log(err.message));
  }
  function assignMemberToWorkspace() {}
  function assignRoleToAccount() {}
  return (
    <AdminContextAPI.Provider
      value={{
        // accounts: accounts,
        // roles: roles,
        ...state,
        createNewAccount,
        editUsername,
        editEmail,
        editPassword,
        editRole,
        getAttachmentByPage,
        downloadAttachmentQAM,
      }}
    >
      {children}
    </AdminContextAPI.Provider>
  );
}

export const useAdminContext = () => {
  return useContext(AdminContextAPI);
};
