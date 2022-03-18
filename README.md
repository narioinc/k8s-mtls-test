# k8s-mtls-test
This repository contains experiments on mutual TLS for mesh or mesh external services in istio

# App1
A simple nodejs app that return a josn object when you hit the root
GET https://nodes-app1/ 

# App2
A slightly modified version of app1 that does the followin
1) has and endpoint /app1 to call app1 and get response
2) has endpoint / simialr to app1 and returns a json object
3) has an endpoint /ipgeo that returns a detail about an IP geolocation from an external https service

The point of this setup is to experiment with kubernetes MTLS as the theory that is given in the istio docs
were not very clear to me

# The k8s resources are as follows:
1) Peer authencation - This YAML enables the STRICT mode of TLS termination for mesh service requests
2) IPGEO Servcie entry - this YAML adds a service entry for the exteral servcie ipinfo.io
3) IPGEO virutal service - adding a virtual service for the external service ipinfo.io
4) APp1 ans app2 deployments an servcie - these YAMLs are for creating the app1 and app2 resources for the two apps mentioned above.  


# Steps to replicate the experiment
1) Deploy the app2 and app2 pods and servcies in the default namespace
2) deploy peer authnetciation so that MTLS is set to strict for the dfault namespace
3) Try to call the various endpoints mentioned above using postman or any tool of your choice (either via the loadblanacer endpoint or using kubectl portforward)
4) Check the traffic graph in Kiali. the connections between the servcie showuld show a green line with a lock indicating that the service is gettign terminated via MTLS
5) Specifically, try to make a few calls to the ipgeo endpoint in app2, you shoudl now see a different arrow pointing to the external https endpoint. This showcases the ability for istio to treat ServcieEntries as services within thr mesh and we can write Destination rules for these items as we need.



