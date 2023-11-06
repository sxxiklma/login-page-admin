import axios from "axios";
import utf8 from "utf8";
import base64 from "base-64";
import { Buffer } from "buffer";
import { Config } from "../../config/Config";
import { decrypt, encodeB64, encrypt } from "../util/Encrypter";

export class Service {
  private path: string;
  private baseUrl: string;

  constructor(path: string) {
    this.path = path;
    this.baseUrl = `${Config.baseUrl}/${path}`;
  }

  // static path = '/contracts';

  // async fetchOne(id) {
  //   let resp:any = [];
  //   let res;
  //   await axios
  //     .get(`${this.baseUrl}/${id}`)
  //     .then((response) => {

  //       resp = [response.status, response.data];

  //       // console.log(userContext);
  //     })
  //     .catch((error) => {
  //       if (error.response) {

  //         resp = [error.response.status, error.response.data];
  //       }
  //       // console.error(error.code);
  //     });

  //   return resp;
  // }

  // async fetchAll() {
  //     let resp:any = [];
  //     let res;
  //     await axios
  //       .get(`${this.baseUrl}`)
  //       .then((response) => {

  //         resp = [response.status, response.data];

  //         // console.log(userContext);
  //       })
  //       .catch((error) => {
  //         if (error.response) {

  //           resp = [error.response.status, error.response.data];
  //         }
  //         // console.error(error.code);
  //       });

  //     return resp;
  //   }

  async create(item) {
    return await this.postPath("", item);
  }

  async fetchAll() {
    return await this.getAllPathQueryParam("");
  }

  async fetchOne(id) {
    return await this.getOnePath("", id);
  }

  async update(id, item) {
    return await this.putPath("", id, item);
  }

  async patch(id, item) {
    return await this.patchPath("", id, item);
  }

  async delete(id) {
    return await this.deletePath("", id);
  }

  // async create(item) {
  //   let resp;
  //   // await axios.get("https://dummyjson.com/products/1").then((response) => {
  //   // });

  //   await axios.post(`${this.baseUrl}`, item, { withCredentials: true }).then((res) => {
  //     return res.data;
  //   }).catch((err) => {
  //     throw err;
  //   })

  //   // return resp;
  // }

  async getAllPathQueryParam(path, param?) {
    path = path && "/" + path;
    var data = await axios
      .get(`${this.baseUrl}${path}`, { withCredentials: true, params: param })
      .then((res) => {
        // data = res.data;
        // data = { body: res.data }
        //   data = [res.status, res.data]
        //   var contracts = data[1];
        // console.log(data[1])
        //   localStorage.setItem('myContracts', JSON.stringify(contracts));
        return [res.status, res.data];
      })
      .catch((err) => {
        throw new Error(err);
      });

    return data;
  }

  async getOnePath(path: string, id) {
    path = path && "/" + path;
    var data = await axios
      .get(`${this.baseUrl}${path}/${id}`, { withCredentials: true })
      .then((res) => {
        return [res.status, res.data];
      })
      .catch((err) => {
        throw new Error("Failed");
      });

    return data;
  }

  async postPath(path, item) {
    path = path && "/" + path;

    var data = await axios
      .post(`${this.baseUrl}${path}`, item, { withCredentials: true })
      .then((res) => {
        // data = res.data;
        // data = { body: res.data }
        //   data = [res.status, res.data]
        //   var contracts = data[1];
        // console.log(data[1])
        //   localStorage.setItem('myContracts', JSON.stringify(contracts));
        return [res.status, res.data];
      })
      .catch((err) => {
        throw new Error("Failed");
      });

    return data;
  }

  async putPath(path, id, item) {
    path = path && "/" + path;

    var data = await axios
      .put(`${this.baseUrl}${path}/${id}`, item, { withCredentials: true })
      .then((res) => {
        // data = res.data;
        // data = { body: res.data }
        //   data = [res.status, res.data]
        //   var contracts = data[1];
        // console.log(data[1])
        //   localStorage.setItem('myContracts', JSON.stringify(contracts));
        return [res.status, res.data];
      })
      .catch((err) => {
        throw new Error("Failed");
      });

    return data;
  }

  async patchPath(path, id, item) {
    path = path && "/" + path;

    var data = await axios
      .patch(`${this.baseUrl}${path}/${id}`, item, { withCredentials: true })
      .then((res) => {
        // data = res.data;
        // data = { body: res.data }
        //   data = [res.status, res.data]
        //   var contracts = data[1];
        // console.log(data[1])
        //   localStorage.setItem('myContracts', JSON.stringify(contracts));
        return [res.status, res.data];
      })
      .catch((err) => {
        throw new Error("Failed");
      });

    return data;
  }

  async deletePath(path, id) {
    path = path && "/" + path;

    var data = await axios
      .delete(`${this.baseUrl}${path}/${id}`, { withCredentials: true })
      .then((res) => {
        // data = res.data;
        // data = { body: res.data }
        //   data = [res.status, res.data]
        //   var contracts = data[1];
        // console.log(data[1])
        //   localStorage.setItem('myContracts', JSON.stringify(contracts));
        return [res.status, res.data];
      })
      .catch((err) => {
        throw new Error("Failed");
      });

    return data;
  }

  static convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
}

// export default Project;
