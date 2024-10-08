import { request, gql } from 'graphql-request'

const MASTER_URL='https://api-us-east-1-shared-usea1-02.hygraph.com/v2/clvnu718c0f4w07ulk4k6lsxo/master'

const getSlider=async()=>{
    const query = gql`
    query GetSlider {
        sliders {
          id
          name
          image {
            url
          }
        }
      }      
`
const result= await request(MASTER_URL, query);
return result;
}

const getCategories=async()=>{
    const query=gql`
    query GetCategory {
        categories {
          id
          name
          icon {
            url
          }
        }
      }
      `

const result= await request(MASTER_URL, query);
return result;
}

const getBusinessList=async()=>{
   const query=gql`
   query GetBusinessList {
    businessLists {
      id
      name
      email
      contactPerson
      categories {
        name
      }
      address
      about
      images {
        url
      }
    }
  }
  ` 
const result= await request(MASTER_URL, query);
return result;
}

export default{
    getSlider,
    getCategories,
    getBusinessList
}

