# API Endpoints

The following table outlines the various API endpoints available, detailing their method, purpose, and whether authentication is required.

| Route                           | Method | Purpose                                                         | Auth Required |
|---------------------------------|--------|-----------------------------------------------------------------|---------------|
| `/api/projects`                 | GET    | Get all projects                                                | N             |
| `/api/projects`                 | POST   | Create a new project                                            | Y             |
| `/api/projects/:id`             | GET    | Get project by id                                               | N             |
| `/api/projects/:id`             | PUT    | Allow user to provide project 'updates' and 'faq'               | Y             |
| `/api/users/register`           | POST   | Create a new user (support both regular and oauth)              | Y for oauth   |
| `/api/users/transaction/summary`| GET    | To support __pledger__ dashboard with transaction summary       | Y             |
| `/api/users/project/summary`    | GET    | [WIP] To support __business__ dashboard with transaction summary| Y             |
| `/api/static/category`          | GET    | Get all categories, can support front-end project form drop-down| N             |
| `/api/static/AccountType`       | GET    | Get all account types                                           | N             |
| `/api/auth`                     | POST   | Receiving token when using regular log-in                       | Y             |

> **Note:** 'Auth Required' column specifies if the endpoint requires authentication. 'Y' indicates authentication is required, 'N' indicates it is not required.


