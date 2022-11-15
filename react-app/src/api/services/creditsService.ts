import { CreditsResponse } from "../../store/creditsSlice/models/CreditsResponse";
import { httpApi } from "../http";
import { Category } from "./tmbd";

class Credits {
  public getCredits = async (id: number, params?: any) => {
    const url = Category.movie + "/" + id + "/credits";

    const response = await httpApi.get<CreditsResponse>(url, {
      params: {
        ...params,
      },
    });

    return response;
  };
}

export const creditsService = new Credits();
