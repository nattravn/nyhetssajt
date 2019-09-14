# NyhetssajtApp

![alt text](printscrn.png)

The front-end was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.4. The backend was  



## Instructions

Clone the repo and open the solution Nyhetssajt.sln located in the WebAPI folder

Open Microsoft SQL Server Management Studio and create a new database called NewsDB

Select `.Net Core2.2` as target framework in your soultion properties (install .Net Core2.2 if it's not available)

Open launchSettings.json copy the applicationUrl adress under iisExpress and replace it angular7/globals.ts.

In Nuget Package Manager run:
`Install-Package NuGet.Frameworks -Version 5.2.0`

Add-Migration InitMigartion -Context Nyhetssajt.Models.CustomContext

UpdateDatabase -Context Nyhetssajt.Models.CustomContext

Start the solution with F5 


Navigate to the Angular7 folder with in your Visual Studio Code terminal and run:
`npm install`

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

