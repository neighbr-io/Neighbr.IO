# API Endpoints

The following table outlines the various API endpoints available, detailing their method, purpose, and whether authentication is required.

| Route                             | Method | Purpose                                                         | Auth Required | Auth Implemented |
|-----------------------------------|--------|-----------------------------------------------------------------|---------------|------------------|
| `/api/projects`                   | GET    | Get all projects                                                | N             |n/a               |
| `/api/projects`                   | POST   | Create a new project                                            | Y             |Y                 |
| `/api/projects/:id`               | GET    | Get project by id                                               | N             |n/a               |
| `/api/projects/:id`               | PUT    | Allow user to provide project 'updates' and 'faq'               | Y             |Y                 |
| `/api/users/register`             | POST   | Create a new user (currently not support Oauth)                 | Y for oauth   |                  |
| `/api/users/transactions`         | GET    | To support __pledger__ dashboard with transaction summary       | Y             |Y                 |
| `/api/users/projects`             | GET    | To support __business__ dashboard with project summary          | Y             |Y                 |
| `/api/static/category`            | GET    | Get all categories, can support front-end project form drop-down| N             |n/a               |
| `/api/static/AccountType`         | GET    | Get all account types                                           | N             |n/a               |
| `/api/auth`                       | POST   | Receiving token when using regular log-in                       | Y             |Y                 |
| `/api/transaction`                | POST   | Record a txn and update the Project table _funded_ field        | Y             |?                 |
| `/api/transaction/:projectId`     | GET    | Get list of transactions by project id for business user        | Y             |Y                 |

> **Note:** 'Auth Required' column specifies if the endpoint requires authentication. 'Y' indicates authentication is required, 'N' indicates it is not required.<br>
> **Note:** 'Auth Implemented' column specifies if authentication compoment has been incorporated. 'Y' indicates it is completed. 'n/a' indicates it is not applicable. 


