export class ApiResponse{
    isSuccessful!: boolean;
    message!: string;
}

export class ApiCollectionResponse extends ApiResponse{
    data!: Array<any>;
}

export class ResultLoginDto extends ApiResponse{
         token!: string;
    }
    
 export class ApiSingleResponse extends ApiResponse{
        data!: any;
    }