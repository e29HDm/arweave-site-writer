# Arweave Website Writer

## Data model

### User Id Contract
optional contract
One contract source
Copy and init a contract per user

#### Data
- name: string
- bio: string
- social_networks: {<string>: Url}
- avatars: Url[]
- selected_avatar: Url

#### Functions
- setInfos
  - input:
      ```
        {
          name: string (max 80 characters),
          bio: string (max 180 characters),
        }
      ```
- setSocialNetworks
  - input:
      ```
        {
          twitter: Url,
          web2: Url,
        }
      ```
- addAvatar
  - input:
      ```
        {
          url: Url,
        }
      ```
- SelectAvatar
  - input:
      ```
        {
          url: Url,
        }
      ```

### Website Contract
optional contract
required if you want to be referenced as a website or collaborate
One contract source
Copy and init a contract per website

#### Data
- name: string
- dns: Url
- ens: Url
- description: string
- participants: Address[]
- social_image: URL

#### Functions
- setInfos
  - input:
    ```
      {
        name: string (max 80 characters),
        dns: Url,
        ens: Url,
        description: string (max 180 characters),
      }
    ```
- AddParticipant
  - input:
      ```
        {
          address: Address,
        }
      ```
  - errors:
    - InvalidAddressError
- RemoveParticipant
  - input:
      ```
        {
          address: Address,
        }
      ```
  - errors:
    - InvalidAddressError
  - SetSocialImage
      - input:
          ```
            {
              url: Url,
            }
          ```
### Post Contract
One contract per post


#### Data 
- website_contract_address: Address
- format: 'Html' or 'json'
- title: string
- files_dir_url: Url
- authors: Address[]
- language: string (lang tag)

#### Functions


### Page Contract

#### Data
- website_contract_address: Address
- format : Html or json
- name: string
- body: string
- language: string (lang tag)
- version: int

### Like Contract
#### Data
- post_contract_address: Address
- like_count: int
- dislike_count: int

## Web App
### Profile Manager
### Website Manager
#### Features
- Create and update websites
- List authorized websites
- Create a post or a page for a website
### Reader