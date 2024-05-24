import { useMutation } from "@tanstack/react-query";
import axios from "axios";
// import { EQueryKey } from "../queryKey";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
// const useApprovalReq = () => {
//   //   const queryClient = useQueryClient();
//   return useMutation({
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     mutationFn: async (obj: any) =>
//       await axios.post(
//         `https://loan-prac-back-76f3c9a1bfa5.herokuapp.com/predict`,
//         obj
//       ),
//   });
// };
const useApprovalReq = () => {
  return useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: async (obj: any) => {
      const response = await axios.post(
        "https://loan-prac-back-76f3c9a1bfa5.herokuapp.com/predict",
        obj,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    },
  });
};

export default useApprovalReq;
