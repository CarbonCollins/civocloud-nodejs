## Modules

<dl>
<dt><a href="#module_CivoCloud/api">CivoCloud/api</a></dt>
<dd><p>The CivoCloud/api module acts as an abstracton layer for accessing the various civo
APIs</p>
</dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Backend">Backend</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="module_CivoCloud/api"></a>

## CivoCloud/api
The CivoCloud/api module acts as an abstracton layer for accessing the various civo
APIs

**See**: [https://www.civo.com/api](https://www.civo.com/api)  

* [CivoCloud/api](#module_CivoCloud/api)
    * [.CivoCloud](#module_CivoCloud/api.CivoCloud)
        * [new CivoCloud(options)](#new_module_CivoCloud/api.CivoCloud_new)
    * [.Charges](#module_CivoCloud/api.Charges) ⇐ <code>module:CivoCloud/api.Civo</code>
        * [~listCharges([options])](#module_CivoCloud/api.Charges..listCharges) ⇒ <code>Promise</code>
    * [.Domain](#module_CivoCloud/api.Domain) ⇐ <code>module:CivoCloud/api.Civo</code>
        * [~listDomains()](#module_CivoCloud/api.Domain..listDomains) ⇒ <code>Promise</code>
        * [~createDomain(name)](#module_CivoCloud/api.Domain..createDomain) ⇒ <code>Promise</code>
        * [~deleteDomain(id)](#module_CivoCloud/api.Domain..deleteDomain) ⇒ <code>Promise</code>
        * [~listDomainRecords(id)](#module_CivoCloud/api.Domain..listDomainRecords) ⇒ <code>Promise</code>
        * [~createDomainRecord(domainId, type, name, value, [options])](#module_CivoCloud/api.Domain..createDomainRecord) ⇒ <code>Promise</code>
        * [~deleteDomainRecord(domainId, id)](#module_CivoCloud/api.Domain..deleteDomainRecord) ⇒ <code>Promise</code>
    * [.Firewall](#module_CivoCloud/api.Firewall) ⇐ <code>module:CivoCloud/api.Civo</code>
        * [~listFirewalls()](#module_CivoCloud/api.Firewall..listFirewalls) ⇒ <code>Promise</code>
        * [~createFirewall(name)](#module_CivoCloud/api.Firewall..createFirewall) ⇒ <code>Promise</code>
        * [~deleteFirewall(id)](#module_CivoCloud/api.Firewall..deleteFirewall) ⇒ <code>Promise</code>
        * [~listFirewallRules(id)](#module_CivoCloud/api.Firewall..listFirewallRules) ⇒ <code>Promise</code>
        * [~createFirewallRule(id, start_port, [options])](#module_CivoCloud/api.Firewall..createFirewallRule) ⇒ <code>Promise</code>
        * [~deleteFirewallRule(firewallId, id)](#module_CivoCloud/api.Firewall..deleteFirewallRule) ⇒ <code>Promise</code>
    * [.Instance](#module_CivoCloud/api.Instance) ⇐ <code>module:CivoCloud/api.Civo</code>
        * _instance_
            * [.instanceSizes](#module_CivoCloud/api.Instance+instanceSizes) : <code>Object</code>
        * _inner_
            * [~listInstances()](#module_CivoCloud/api.Instance..listInstances) ⇒ <code>Promise</code>
            * [~createInstance(size, network_id, hostname, [options])](#module_CivoCloud/api.Instance..createInstance) ⇒ <code>Promise</code>
            * [~deleteInstance(id)](#module_CivoCloud/api.Instance..deleteInstance) ⇒ <code>Promise</code>
            * [~getInstance(id)](#module_CivoCloud/api.Instance..getInstance) ⇒ <code>Promise</code>
            * [~retagInstance(id, [options])](#module_CivoCloud/api.Instance..retagInstance) ⇒ <code>Promise</code>
            * [~rebootInstance(id)](#module_CivoCloud/api.Instance..rebootInstance) ⇒ <code>Promise</code>
            * [~hardRebootInstance(id)](#module_CivoCloud/api.Instance..hardRebootInstance) ⇒ <code>Promise</code>
            * [~softRebootInstance(id)](#module_CivoCloud/api.Instance..softRebootInstance) ⇒ <code>Promise</code>
            * [~stopInstance(id)](#module_CivoCloud/api.Instance..stopInstance) ⇒ <code>Promise</code>
            * [~startInstance(id)](#module_CivoCloud/api.Instance..startInstance) ⇒ <code>Promise</code>
            * [~resizeInstance(id, size)](#module_CivoCloud/api.Instance..resizeInstance) ⇒ <code>Promise</code>
            * [~rebuildInstance(id)](#module_CivoCloud/api.Instance..rebuildInstance) ⇒ <code>Promise</code>
            * [~restoreInstance(id, snapshot)](#module_CivoCloud/api.Instance..restoreInstance) ⇒ <code>Promise</code>
            * [~updateInstanceFirewall(id, [options])](#module_CivoCloud/api.Instance..updateInstanceFirewall) ⇒ <code>Promise</code>
            * [~movePublicIpToInstance(id, ipAddress)](#module_CivoCloud/api.Instance..movePublicIpToInstance) ⇒ <code>Promise</code>
    * [.InstanceRegion](#module_CivoCloud/api.InstanceRegion) ⇐ <code>module:CivoCloud/api.Civo</code>
        * [~listRegions()](#module_CivoCloud/api.InstanceRegion..listRegions) ⇒ <code>Promise</code>
    * [.InstanceSizing](#module_CivoCloud/api.InstanceSizing) ⇐ <code>module:CivoCloud/api.Civo</code>
        * [~listInstanceSizes()](#module_CivoCloud/api.InstanceSizing..listInstanceSizes) ⇒ <code>Promise</code>
    * [.LoadBallancer](#module_CivoCloud/api.LoadBallancer) ⇐ <code>module:CivoCloud/api.Civo</code>
        * [~listLoadBalancers()](#module_CivoCloud/api.LoadBallancer..listLoadBalancers) ⇒ <code>Promise</code>
        * [~createLoadBalancer(hostname, backends, [options])](#module_CivoCloud/api.LoadBallancer..createLoadBalancer) ⇒ <code>Promise</code>
        * [~updateLoadBalancer(id, [options])](#module_CivoCloud/api.LoadBallancer..updateLoadBalancer) ⇒ <code>Promise</code>
        * [~deleteLoadBalancer(id)](#module_CivoCloud/api.LoadBallancer..deleteLoadBalancer) ⇒ <code>Promise</code>
    * [.Network](#module_CivoCloud/api.Network) ⇐ <code>module:CivoCloud/api.Civo</code>
        * [~listNetworks()](#module_CivoCloud/api.Network..listNetworks) ⇒ <code>Promise</code>
        * [~createNetwork(label, [options])](#module_CivoCloud/api.Network..createNetwork) ⇒ <code>Promise</code>
        * [~renameNetwork(id, label)](#module_CivoCloud/api.Network..renameNetwork) ⇒ <code>Promise</code>
        * [~deleteNetwork(id)](#module_CivoCloud/api.Network..deleteNetwork) ⇒ <code>Promise</code>
    * [.Quota](#module_CivoCloud/api.Quota) ⇐ <code>module:CivoCloud/api.Civo</code>
        * [~getQuota()](#module_CivoCloud/api.Quota..getQuota) ⇒ <code>Promise</code>
    * [.Snapshot](#module_CivoCloud/api.Snapshot) ⇐ <code>module:CivoCloud/api.Civo</code>
        * [~listSnapshots()](#module_CivoCloud/api.Snapshot..listSnapshots) ⇒ <code>Promise</code>
        * [~createSnapshot(name, instance_id, safe)](#module_CivoCloud/api.Snapshot..createSnapshot) ⇒ <code>Promise</code>
        * [~updateSnapshot(name, instance_id, safe)](#module_CivoCloud/api.Snapshot..updateSnapshot) ⇒ <code>Promise</code>
        * [~deleteSnapshot(name)](#module_CivoCloud/api.Snapshot..deleteSnapshot) ⇒ <code>Promise</code>
    * [.SSHKeys](#module_CivoCloud/api.SSHKeys) ⇐ <code>module:CivoCloud/api.Civo</code>
        * [~listSSHKeys()](#module_CivoCloud/api.SSHKeys..listSSHKeys) ⇒ <code>Promise</code>
        * [~uploadSSHKey(name, public_key)](#module_CivoCloud/api.SSHKeys..uploadSSHKey) ⇒ <code>Promise</code>
        * [~deleteSSHKey(name)](#module_CivoCloud/api.SSHKeys..deleteSSHKey) ⇒ <code>Promise</code>
    * [.Template](#module_CivoCloud/api.Template) ⇐ <code>module:CivoCloud/api.Civo</code>
        * [~listTemplates()](#module_CivoCloud/api.Template..listTemplates) ⇒ <code>Promise</code>
        * [~createTemplate(name, image_id, [options])](#module_CivoCloud/api.Template..createTemplate) ⇒ <code>Promise</code>
        * [~updateTemplate(id, [options])](#module_CivoCloud/api.Template..updateTemplate) ⇒ <code>Promise</code>
        * [~deleteTemplate(id)](#module_CivoCloud/api.Template..deleteTemplate) ⇒ <code>Promise</code>
    * [.Webhook](#module_CivoCloud/api.Webhook) ⇐ <code>module:CivoCloud/api.Civo</code>
        * [~listWebhooks()](#module_CivoCloud/api.Webhook..listWebhooks) ⇒ <code>Promise</code>
        * [~createWebhook(url, [options])](#module_CivoCloud/api.Webhook..createWebhook) ⇒ <code>Promise</code>
        * [~deleteWebhook(id)](#module_CivoCloud/api.Webhook..deleteWebhook) ⇒ <code>Promise</code>
        * [~testWebhook(id)](#module_CivoCloud/api.Webhook..testWebhook) ⇒ <code>Promise</code>
        * [~updateWebhook(id, [options])](#module_CivoCloud/api.Webhook..updateWebhook) ⇒ <code>Promise</code>


* * *

<a name="module_CivoCloud/api.CivoCloud"></a>

### CivoCloud/api.CivoCloud
**Kind**: static class of [<code>CivoCloud/api</code>](#module_CivoCloud/api)  

* * *

<a name="new_module_CivoCloud/api.CivoCloud_new"></a>

#### new CivoCloud(options)

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| options | <code>Object</code> |  |  |
| options.apiToken | <code>String</code> |  | the provided api token from your civo account |
| [options.host] | <code>String</code> | <code>https://api.civo.com/v2</code> | An optional end point |
| [options.port] | <code>String</code> \| <code>Number</code> | <code>443</code> | an optional port to call |


* * *

<a name="module_CivoCloud/api.Charges"></a>

### CivoCloud/api.Charges ⇐ <code>module:CivoCloud/api.Civo</code>
**Kind**: static class of [<code>CivoCloud/api</code>](#module_CivoCloud/api)  
**Extends**: <code>module:CivoCloud/api.Civo</code>  
**See**: [https://www.civo.com/api/charges](https://www.civo.com/api/charges)  

* * *

<a name="module_CivoCloud/api.Charges..listCharges"></a>

#### Charges~listCharges([options]) ⇒ <code>Promise</code>
gets an array of chargable service hours [GET]

**Kind**: inner method of [<code>Charges</code>](#module_CivoCloud/api.Charges)  
**Access**: public  
**See**: [https://www.civo.com/api/charges#listing-charges](https://www.civo.com/api/charges#listing-charges)  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | an optional options object |
| [options.from] | <code>String</code> \| <code>Date</code> | optional from date range |
| [options.to] | <code>String</code> \| <code>Date</code> | optional to date range (max 31 days) |


* * *

<a name="module_CivoCloud/api.Domain"></a>

### CivoCloud/api.Domain ⇐ <code>module:CivoCloud/api.Civo</code>
**Kind**: static class of [<code>CivoCloud/api</code>](#module_CivoCloud/api)  
**Extends**: <code>module:CivoCloud/api.Civo</code>  
**See**: [https://www.civo.com/api/dns](https://www.civo.com/api/dns)  

* [.Domain](#module_CivoCloud/api.Domain) ⇐ <code>module:CivoCloud/api.Civo</code>
    * [~listDomains()](#module_CivoCloud/api.Domain..listDomains) ⇒ <code>Promise</code>
    * [~createDomain(name)](#module_CivoCloud/api.Domain..createDomain) ⇒ <code>Promise</code>
    * [~deleteDomain(id)](#module_CivoCloud/api.Domain..deleteDomain) ⇒ <code>Promise</code>
    * [~listDomainRecords(id)](#module_CivoCloud/api.Domain..listDomainRecords) ⇒ <code>Promise</code>
    * [~createDomainRecord(domainId, type, name, value, [options])](#module_CivoCloud/api.Domain..createDomainRecord) ⇒ <code>Promise</code>
    * [~deleteDomainRecord(domainId, id)](#module_CivoCloud/api.Domain..deleteDomainRecord) ⇒ <code>Promise</code>


* * *

<a name="module_CivoCloud/api.Domain..listDomains"></a>

#### Domain~listDomains() ⇒ <code>Promise</code>
gets an array of the domains on civo account [GET]

**Kind**: inner method of [<code>Domain</code>](#module_CivoCloud/api.Domain)  
**Returns**: <code>Promise</code> - a promise which resolves with the firewall list or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/dns#list-domain-names](https://www.civo.com/api/dns#list-domain-names)  

* * *

<a name="module_CivoCloud/api.Domain..createDomain"></a>

#### Domain~createDomain(name) ⇒ <code>Promise</code>
creates a new domain within civo [POST]

**Kind**: inner method of [<code>Domain</code>](#module_CivoCloud/api.Domain)  
**Returns**: <code>Promise</code> - a promise which resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/dns#setup-a-new-domain](https://www.civo.com/api/dns#setup-a-new-domain)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | the domain name for the new domain |


* * *

<a name="module_CivoCloud/api.Domain..deleteDomain"></a>

#### Domain~deleteDomain(id) ⇒ <code>Promise</code>
removes a new domain within civo [DELETE]

**Kind**: inner method of [<code>Domain</code>](#module_CivoCloud/api.Domain)  
**Returns**: <code>Promise</code> - a promise which resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/dns#deleting-a-domain](https://www.civo.com/api/dns#deleting-a-domain)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the domain id to be deleted |


* * *

<a name="module_CivoCloud/api.Domain..listDomainRecords"></a>

#### Domain~listDomainRecords(id) ⇒ <code>Promise</code>
gets an array of the domains on civo account [GET]

**Kind**: inner method of [<code>Domain</code>](#module_CivoCloud/api.Domain)  
**Returns**: <code>Promise</code> - a promise which resolves with the firewall list or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/dns#list-dns-records](https://www.civo.com/api/dns#list-dns-records)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the domains id to get the records in |


* * *

<a name="module_CivoCloud/api.Domain..createDomainRecord"></a>

#### Domain~createDomainRecord(domainId, type, name, value, [options]) ⇒ <code>Promise</code>
gets an array of the domains on civo account [POST]

**Kind**: inner method of [<code>Domain</code>](#module_CivoCloud/api.Domain)  
**Returns**: <code>Promise</code> - a promise which resolves with the firewall list or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/dns#create-a-new-dns-record](https://www.civo.com/api/dns#create-a-new-dns-record)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| domainId | <code>String</code> |  | the domain to delete the record from |
| type | <code>String</code> |  | the type of dns record to use which can be either: 'a', 'cname', 'mx', or 'txt' |
| name | <code>String</code> |  | the portion before the domain name (e.g. 'www', or '@') |
| value | <code>Stirng</code> |  | the ip address fr this dns record to serve |
| [options] | <code>Object</code> |  | an optional options object |
| [options.priority] | <code>Number</code> | <code>10</code> | mx records only but determines the priority of the |
| [options.ttl] | <code>Number</code> | <code>3600</code> | the time to live for the dns record in seconds |


* * *

<a name="module_CivoCloud/api.Domain..deleteDomainRecord"></a>

#### Domain~deleteDomainRecord(domainId, id) ⇒ <code>Promise</code>
removes a new domain within civo [DELETE]

**Kind**: inner method of [<code>Domain</code>](#module_CivoCloud/api.Domain)  
**Returns**: <code>Promise</code> - a promise which resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/dns#deleting-a-dns-record](https://www.civo.com/api/dns#deleting-a-dns-record)  

| Param | Type | Description |
| --- | --- | --- |
| domainId | <code>String</code> | the domain to delete the record from |
| id | <code>String</code> | the record to be deleted |


* * *

<a name="module_CivoCloud/api.Firewall"></a>

### CivoCloud/api.Firewall ⇐ <code>module:CivoCloud/api.Civo</code>
**Kind**: static class of [<code>CivoCloud/api</code>](#module_CivoCloud/api)  
**Extends**: <code>module:CivoCloud/api.Civo</code>  
**See**: [https://www.civo.com/api/firewall](https://www.civo.com/api/firewall)  

* [.Firewall](#module_CivoCloud/api.Firewall) ⇐ <code>module:CivoCloud/api.Civo</code>
    * [~listFirewalls()](#module_CivoCloud/api.Firewall..listFirewalls) ⇒ <code>Promise</code>
    * [~createFirewall(name)](#module_CivoCloud/api.Firewall..createFirewall) ⇒ <code>Promise</code>
    * [~deleteFirewall(id)](#module_CivoCloud/api.Firewall..deleteFirewall) ⇒ <code>Promise</code>
    * [~listFirewallRules(id)](#module_CivoCloud/api.Firewall..listFirewallRules) ⇒ <code>Promise</code>
    * [~createFirewallRule(id, start_port, [options])](#module_CivoCloud/api.Firewall..createFirewallRule) ⇒ <code>Promise</code>
    * [~deleteFirewallRule(firewallId, id)](#module_CivoCloud/api.Firewall..deleteFirewallRule) ⇒ <code>Promise</code>


* * *

<a name="module_CivoCloud/api.Firewall..listFirewalls"></a>

#### Firewall~listFirewalls() ⇒ <code>Promise</code>
gets an array of the firewalls on civo account [GET]

**Kind**: inner method of [<code>Firewall</code>](#module_CivoCloud/api.Firewall)  
**Returns**: <code>Promise</code> - a promise which resolves with the firewall list or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/firewall#list-firewalls](https://www.civo.com/api/firewall#list-firewalls)  

* * *

<a name="module_CivoCloud/api.Firewall..createFirewall"></a>

#### Firewall~createFirewall(name) ⇒ <code>Promise</code>
creates a new firewall in civo [POST]

**Kind**: inner method of [<code>Firewall</code>](#module_CivoCloud/api.Firewall)  
**Returns**: <code>Promise</code> - a promise which resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/firewall#create-a-new-firewall](https://www.civo.com/api/firewall#create-a-new-firewall)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | the name to be used to identify the firewall in civo |


* * *

<a name="module_CivoCloud/api.Firewall..deleteFirewall"></a>

#### Firewall~deleteFirewall(id) ⇒ <code>Promise</code>
deletes an existing firewall within civo [DELETE]

**Kind**: inner method of [<code>Firewall</code>](#module_CivoCloud/api.Firewall)  
**Returns**: <code>Promise</code> - a promise which resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/firewall#deleting-a-firewall](https://www.civo.com/api/firewall#deleting-a-firewall)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the firewalls id to be used to identify the network in civo |


* * *

<a name="module_CivoCloud/api.Firewall..listFirewallRules"></a>

#### Firewall~listFirewallRules(id) ⇒ <code>Promise</code>
gets an array of the firewalls rules on civo account [GET]

**Kind**: inner method of [<code>Firewall</code>](#module_CivoCloud/api.Firewall)  
**Returns**: <code>Promise</code> - a promise which resolves with the firewall list or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/firewall#list-firewall-rules](https://www.civo.com/api/firewall#list-firewall-rules)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the firewalls id to be used to identify the network in civo |


* * *

<a name="module_CivoCloud/api.Firewall..createFirewallRule"></a>

#### Firewall~createFirewallRule(id, start_port, [options]) ⇒ <code>Promise</code>
creates a new firewall rule within an existing firewall [POST]

**Kind**: inner method of [<code>Firewall</code>](#module_CivoCloud/api.Firewall)  
**Returns**: <code>Promise</code> - a promise which resolves with a success or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/firewall#create-a-new-firewall-rule](https://www.civo.com/api/firewall#create-a-new-firewall-rule)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the Id for the firewall to create the rule in |
| start_port | <code>String</code> \| <code>Number</code> | The single port or start of a range of ports to allows |
| [options] | <code>Object</code> | an optional object |
| [options.end_port] | <code>Stirng</code> \| <code>Number</code> | the end of a range of ports |
| [options.protocol] | <code>String</code> | the protocol that the ule will allow e.g. 'tcp' |
| [options.direction] | <code>String</code> | the direction in which the rule applies to e.g. 'inwards' |
| [options.cidr] | <code>String</code> | a ip range in which the rule is applied to e.g. '0.0.0.0/0' for all |


* * *

<a name="module_CivoCloud/api.Firewall..deleteFirewallRule"></a>

#### Firewall~deleteFirewallRule(firewallId, id) ⇒ <code>Promise</code>
deletes an existing firewall rule within a firewall [DELETE]

**Kind**: inner method of [<code>Firewall</code>](#module_CivoCloud/api.Firewall)  
**Returns**: <code>Promise</code> - a promise which resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/firewall#deleting-a-firewall-rule](https://www.civo.com/api/firewall#deleting-a-firewall-rule)  

| Param | Type | Description |
| --- | --- | --- |
| firewallId | <code>String</code> | the firewalls id to be used to identify in civo |
| id | <code>String</code> | the firewall rules id in civo |


* * *

<a name="module_CivoCloud/api.Instance"></a>

### CivoCloud/api.Instance ⇐ <code>module:CivoCloud/api.Civo</code>
**Kind**: static class of [<code>CivoCloud/api</code>](#module_CivoCloud/api)  
**Extends**: <code>module:CivoCloud/api.Civo</code>  
**See**: [https://www.civo.com/api/instances](https://www.civo.com/api/instances)  

* [.Instance](#module_CivoCloud/api.Instance) ⇐ <code>module:CivoCloud/api.Civo</code>
    * _instance_
        * [.instanceSizes](#module_CivoCloud/api.Instance+instanceSizes) : <code>Object</code>
    * _inner_
        * [~listInstances()](#module_CivoCloud/api.Instance..listInstances) ⇒ <code>Promise</code>
        * [~createInstance(size, network_id, hostname, [options])](#module_CivoCloud/api.Instance..createInstance) ⇒ <code>Promise</code>
        * [~deleteInstance(id)](#module_CivoCloud/api.Instance..deleteInstance) ⇒ <code>Promise</code>
        * [~getInstance(id)](#module_CivoCloud/api.Instance..getInstance) ⇒ <code>Promise</code>
        * [~retagInstance(id, [options])](#module_CivoCloud/api.Instance..retagInstance) ⇒ <code>Promise</code>
        * [~rebootInstance(id)](#module_CivoCloud/api.Instance..rebootInstance) ⇒ <code>Promise</code>
        * [~hardRebootInstance(id)](#module_CivoCloud/api.Instance..hardRebootInstance) ⇒ <code>Promise</code>
        * [~softRebootInstance(id)](#module_CivoCloud/api.Instance..softRebootInstance) ⇒ <code>Promise</code>
        * [~stopInstance(id)](#module_CivoCloud/api.Instance..stopInstance) ⇒ <code>Promise</code>
        * [~startInstance(id)](#module_CivoCloud/api.Instance..startInstance) ⇒ <code>Promise</code>
        * [~resizeInstance(id, size)](#module_CivoCloud/api.Instance..resizeInstance) ⇒ <code>Promise</code>
        * [~rebuildInstance(id)](#module_CivoCloud/api.Instance..rebuildInstance) ⇒ <code>Promise</code>
        * [~restoreInstance(id, snapshot)](#module_CivoCloud/api.Instance..restoreInstance) ⇒ <code>Promise</code>
        * [~updateInstanceFirewall(id, [options])](#module_CivoCloud/api.Instance..updateInstanceFirewall) ⇒ <code>Promise</code>
        * [~movePublicIpToInstance(id, ipAddress)](#module_CivoCloud/api.Instance..movePublicIpToInstance) ⇒ <code>Promise</code>


* * *

<a name="module_CivoCloud/api.Instance+instanceSizes"></a>

#### instance.instanceSizes : <code>Object</code>
an object containing the different instance sizes for use with the API

**Kind**: instance property of [<code>Instance</code>](#module_CivoCloud/api.Instance)  

* * *

<a name="module_CivoCloud/api.Instance..listInstances"></a>

#### Instance~listInstances() ⇒ <code>Promise</code>
gets an array of the instances on civo cloud [GET]

**Kind**: inner method of [<code>Instance</code>](#module_CivoCloud/api.Instance)  
**Returns**: <code>Promise</code> - a promise wich resolves with the instance list or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/instances#list-instances](https://www.civo.com/api/instances#list-instances)  

* * *

<a name="module_CivoCloud/api.Instance..createInstance"></a>

#### Instance~createInstance(size, network_id, hostname, [options]) ⇒ <code>Promise</code>
creates a new instance network in civo [POST]

**Kind**: inner method of [<code>Instance</code>](#module_CivoCloud/api.Instance)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/instances#create-an-instance](https://www.civo.com/api/instances#create-an-instance)  

| Param | Type | Description |
| --- | --- | --- |
| size | <code>String</code> | the size of the instance to create (obtained from listInstanceSizes()) |
| network_id | <code>String</code> | the id of the private network to create the instance in |
| hostname | <code>String</code> | the name of the instance to use |
| [options] | <code>Object</code> | an optional options object |
| [options.template] | <code>String</code> | the id of the template to use |
| [options.initial_user] | <code>String</code> | the name of the initial user to create on the instance |
| [options.ssh_key_id] | <code>String</code> | the id of the ssh key to add to the instance |
| [options.region] | <code>String</code> | the region to create the instance in |
| [options.public_ip] | <code>Boolean</code> | specifies if a public ip should be used for the instance |
| [options.snapshot_id] | <code>String</code> | the id of the snapshot to load into the instance |
| [options.tags] | <code>String</code> | a space seperated list of tags to add to the instance |


* * *

<a name="module_CivoCloud/api.Instance..deleteInstance"></a>

#### Instance~deleteInstance(id) ⇒ <code>Promise</code>
deletes an existing instance within civo [DELETE]

**Kind**: inner method of [<code>Instance</code>](#module_CivoCloud/api.Instance)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/instances#deleting-an-instance](https://www.civo.com/api/instances#deleting-an-instance)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the instance id to be used to identify the instance in civo |


* * *

<a name="module_CivoCloud/api.Instance..getInstance"></a>

#### Instance~getInstance(id) ⇒ <code>Promise</code>
gets an existing instance from civo [GET]

**Kind**: inner method of [<code>Instance</code>](#module_CivoCloud/api.Instance)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/instances#retrieving-an-instance](https://www.civo.com/api/instances#retrieving-an-instance)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the instance id to be used to identify the instance in civo |


* * *

<a name="module_CivoCloud/api.Instance..retagInstance"></a>

#### Instance~retagInstance(id, [options]) ⇒ <code>Promise</code>
updates the tags on an existing instance in civo [PUT]

**Kind**: inner method of [<code>Instance</code>](#module_CivoCloud/api.Instance)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/instances#retagging-an-instance](https://www.civo.com/api/instances#retagging-an-instance)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the instance id to be used to identify the instance in civo |
| [options] | <code>Object</code> | an optional options object |
| [options.tags] | <code>Array.&lt;String&gt;</code> \| <code>String</code> | a space seperated string of tags or an array of tags |


* * *

<a name="module_CivoCloud/api.Instance..rebootInstance"></a>

#### Instance~rebootInstance(id) ⇒ <code>Promise</code>
reboots an instance in civo [POST]

**Kind**: inner method of [<code>Instance</code>](#module_CivoCloud/api.Instance)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/instances#rebooting-an-instance](https://www.civo.com/api/instances#rebooting-an-instance)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the instance id to be used to identify the instance in civo |


* * *

<a name="module_CivoCloud/api.Instance..hardRebootInstance"></a>

#### Instance~hardRebootInstance(id) ⇒ <code>Promise</code>
hard reboots an instance in civo [POST]

**Kind**: inner method of [<code>Instance</code>](#module_CivoCloud/api.Instance)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/instances#rebooting-an-instance](https://www.civo.com/api/instances#rebooting-an-instance)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the instance id to be used to identify the instance in civo |


* * *

<a name="module_CivoCloud/api.Instance..softRebootInstance"></a>

#### Instance~softRebootInstance(id) ⇒ <code>Promise</code>
soft reboots an instance in civo [POST]

**Kind**: inner method of [<code>Instance</code>](#module_CivoCloud/api.Instance)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/instances#rebooting-an-instance](https://www.civo.com/api/instances#rebooting-an-instance)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the instance id to be used to identify the instance in civo |


* * *

<a name="module_CivoCloud/api.Instance..stopInstance"></a>

#### Instance~stopInstance(id) ⇒ <code>Promise</code>
stops (shutdown) an instance in civo [PUT]

**Kind**: inner method of [<code>Instance</code>](#module_CivoCloud/api.Instance)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/instances#shutting-down-an-instance](https://www.civo.com/api/instances#shutting-down-an-instance)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the instance id to be used to identify the instance in civo |


* * *

<a name="module_CivoCloud/api.Instance..startInstance"></a>

#### Instance~startInstance(id) ⇒ <code>Promise</code>
starts an instance in civo [PUT]

**Kind**: inner method of [<code>Instance</code>](#module_CivoCloud/api.Instance)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/instances#starting-an-instance-after-being-shut-down](https://www.civo.com/api/instances#starting-an-instance-after-being-shut-down)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the instance id to be used to identify the instance in civo |


* * *

<a name="module_CivoCloud/api.Instance..resizeInstance"></a>

#### Instance~resizeInstance(id, size) ⇒ <code>Promise</code>
resizes an instance in civo [PUT]

**Kind**: inner method of [<code>Instance</code>](#module_CivoCloud/api.Instance)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/instances#updating-resizing-an-instance](https://www.civo.com/api/instances#updating-resizing-an-instance)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the instance id to be used to identify the instance in civo |
| size | <code>String</code> | the new size to resize the exsting instance to |


* * *

<a name="module_CivoCloud/api.Instance..rebuildInstance"></a>

#### Instance~rebuildInstance(id) ⇒ <code>Promise</code>
rebuilds an instance in civo [PUT]

**Kind**: inner method of [<code>Instance</code>](#module_CivoCloud/api.Instance)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/instances#rebuilding-an-instance](https://www.civo.com/api/instances#rebuilding-an-instance)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the instance id to be used to identify the instance in civo |


* * *

<a name="module_CivoCloud/api.Instance..restoreInstance"></a>

#### Instance~restoreInstance(id, snapshot) ⇒ <code>Promise</code>
restores an instance in civo from a snapshot [PUT]

**Kind**: inner method of [<code>Instance</code>](#module_CivoCloud/api.Instance)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/instances#restoring-an-instance-from-a-snapshot](https://www.civo.com/api/instances#restoring-an-instance-from-a-snapshot)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the instance id to be used to identify the instance in civo |
| snapshot | <code>String</code> | the snapshot id to specify which snapshot to restore |


* * *

<a name="module_CivoCloud/api.Instance..updateInstanceFirewall"></a>

#### Instance~updateInstanceFirewall(id, [options]) ⇒ <code>Promise</code>
Applies a firewall to an instance [PUT]

**Kind**: inner method of [<code>Instance</code>](#module_CivoCloud/api.Instance)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/instances#setting-the-firewall-for-an-instance](https://www.civo.com/api/instances#setting-the-firewall-for-an-instance)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the instance id to be used to identify the instance in civo |
| [options] | <code>Object</code> | an optional options object |
| [options.firewall_id] | <code>String</code> | the firewall id to specify which firewall to apply |


* * *

<a name="module_CivoCloud/api.Instance..movePublicIpToInstance"></a>

#### Instance~movePublicIpToInstance(id, ipAddress) ⇒ <code>Promise</code>
Moves an owned public ip address from one instance you own to another instance [PUT]

**Kind**: inner method of [<code>Instance</code>](#module_CivoCloud/api.Instance)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/instances#moving-a-public-ip-between-instances](https://www.civo.com/api/instances#moving-a-public-ip-between-instances)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the instance id to be used to identify the instance in civo |
| ipAddress | <code>String</code> | the ip address to move to this instance |


* * *

<a name="module_CivoCloud/api.InstanceRegion"></a>

### CivoCloud/api.InstanceRegion ⇐ <code>module:CivoCloud/api.Civo</code>
**Kind**: static class of [<code>CivoCloud/api</code>](#module_CivoCloud/api)  
**Extends**: <code>module:CivoCloud/api.Civo</code>  
**See**: [https://www.civo.com/api/regions](https://www.civo.com/api/regions)  

* * *

<a name="module_CivoCloud/api.InstanceRegion..listRegions"></a>

#### InstanceRegion~listRegions() ⇒ <code>Promise</code>
gets an array of the currently available regions on civo cloud [GET]

**Kind**: inner method of [<code>InstanceRegion</code>](#module_CivoCloud/api.InstanceRegion)  
**Returns**: <code>Promise</code> - a promise wich resolves with the available region list or rejects with an
error  
**Access**: public  
**See**: [https://www.civo.com/api/regions#listing-available-regions](https://www.civo.com/api/regions#listing-available-regions)  

* * *

<a name="module_CivoCloud/api.InstanceSizing"></a>

### CivoCloud/api.InstanceSizing ⇐ <code>module:CivoCloud/api.Civo</code>
**Kind**: static class of [<code>CivoCloud/api</code>](#module_CivoCloud/api)  
**Extends**: <code>module:CivoCloud/api.Civo</code>  
**See**: [https://www.civo.com/api/sizes](https://www.civo.com/api/sizes)  

* * *

<a name="module_CivoCloud/api.InstanceSizing..listInstanceSizes"></a>

#### InstanceSizing~listInstanceSizes() ⇒ <code>Promise</code>
gets an array of the currently available instance sizes on civo cloud [GET]

**Kind**: inner method of [<code>InstanceSizing</code>](#module_CivoCloud/api.InstanceSizing)  
**Returns**: <code>Promise</code> - a promise wich resolves with the instance size list or rejects with an
error  
**Access**: public  
**See**: [https://www.civo.com/api/sizes#listing-available-sizes](https://www.civo.com/api/sizes#listing-available-sizes)  

* * *

<a name="module_CivoCloud/api.LoadBallancer"></a>

### CivoCloud/api.LoadBallancer ⇐ <code>module:CivoCloud/api.Civo</code>
**Kind**: static class of [<code>CivoCloud/api</code>](#module_CivoCloud/api)  
**Extends**: <code>module:CivoCloud/api.Civo</code>  
**See**: [https://www.civo.com/api/loadbalancer](https://www.civo.com/api/loadbalancer)  

* [.LoadBallancer](#module_CivoCloud/api.LoadBallancer) ⇐ <code>module:CivoCloud/api.Civo</code>
    * [~listLoadBalancers()](#module_CivoCloud/api.LoadBallancer..listLoadBalancers) ⇒ <code>Promise</code>
    * [~createLoadBalancer(hostname, backends, [options])](#module_CivoCloud/api.LoadBallancer..createLoadBalancer) ⇒ <code>Promise</code>
    * [~updateLoadBalancer(id, [options])](#module_CivoCloud/api.LoadBallancer..updateLoadBalancer) ⇒ <code>Promise</code>
    * [~deleteLoadBalancer(id)](#module_CivoCloud/api.LoadBallancer..deleteLoadBalancer) ⇒ <code>Promise</code>


* * *

<a name="module_CivoCloud/api.LoadBallancer..listLoadBalancers"></a>

#### LoadBallancer~listLoadBalancers() ⇒ <code>Promise</code>
Lists all of the available load ballancers on the civo account [GET]

**Kind**: inner method of [<code>LoadBallancer</code>](#module_CivoCloud/api.LoadBallancer)  
**Returns**: <code>Promise</code> - resolves with a list of available load balancers or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/loadbalancer#list-load-balancers](https://www.civo.com/api/loadbalancer#list-load-balancers)  

* * *

<a name="module_CivoCloud/api.LoadBallancer..createLoadBalancer"></a>

#### LoadBallancer~createLoadBalancer(hostname, backends, [options]) ⇒ <code>Promise</code>
Creates a new load ballancer on the civo account [POST]

**Kind**: inner method of [<code>LoadBallancer</code>](#module_CivoCloud/api.LoadBallancer)  
**Returns**: <code>Promise</code> - resolves when load balancer is created or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/loadbalancer#setup-a-new-load-balancer](https://www.civo.com/api/loadbalancer#setup-a-new-load-balancer)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| hostname | <code>String</code> |  | the hostname to receive traffic on |
| backends | [<code>Array.&lt;Backend&gt;</code>](#Backend) |  | an array of backends to load ballance |
| [options] | <code>Object</code> |  | an optional object containing all optional parameters |
| [options.protocol] | <code>String</code> | <code>&#x27;http&#x27;</code> | protocol to use (either 'http' or 'https') |
| [options.tls_certificate] | <code>String</code> |  | if protocol is https then base64-encoded certificate in PEM format |
| [options.tls_key] | <code>String</code> |  | if protocol is https then base64-encoded key in PEM format |
| [options.port] | <code>String</code> \| <code>Number</code> | <code>80</code> | the port to listen on |
| [options.max_request_size] | <code>Number</code> | <code>20</code> | the maximum request size in megabytes |
| [options.policy] | <code>String</code> | <code>&#x27;random&#x27;</code> | routing policy can be either 'least_conn', 'random', 'round_robin', or 'ip_hash' |
| [options.health_check_path] | <code>String</code> | <code>&#x27;/&#x27;</code> | what url to use on the backends to check status |
| [options.fail_timeout] | <code>Number</code> | <code>30</code> | how long to wait (in seconds) before determining backend failure |
| [options.max_conns] | <code>Number</code> | <code>10</code> | how many concurrent connections a backend can handle |
| [options.ignore_invalid_backend_tls] | <code>Boolean</code> | <code>true</code> | ignore invalid/self-signed tls certs on backend |


* * *

<a name="module_CivoCloud/api.LoadBallancer..updateLoadBalancer"></a>

#### LoadBallancer~updateLoadBalancer(id, [options]) ⇒ <code>Promise</code>
updates an existing load ballancer with new information [PUT]

**Kind**: inner method of [<code>LoadBallancer</code>](#module_CivoCloud/api.LoadBallancer)  
**Returns**: <code>Promise</code> - resolves when load balancer is created or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/loadbalancer#update-a-load-balancer](https://www.civo.com/api/loadbalancer#update-a-load-balancer)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the load balancers id to update |
| [options] | <code>Object</code> | an optional object containing all optional parameters |
| [options.hostname] | <code>String</code> | the hostname to receive traffic on |
| [options.backends] | [<code>Array.&lt;Backend&gt;</code>](#Backend) | an array of backends to load ballance |
| [options.protocol] | <code>String</code> | protocol to use (either 'http' or 'https') |
| [options.tls_certificate] | <code>String</code> | if protocol is https then base64-encoded certificate in PEM format |
| [options.tls_key] | <code>String</code> | if protocol is https then base64-encoded key in PEM format |
| [options.port] | <code>String</code> \| <code>Number</code> | the port to listen on |
| [options.max_request_size] | <code>Number</code> | the maximum request size in megabytes |
| [options.policy] | <code>String</code> | routing policy can be either 'least_conn', 'random', 'round_robin', or 'ip_hash' |
| [options.health_check_path] | <code>String</code> | what url to use on the backends to check status |
| [options.fail_timeout] | <code>Number</code> | how long to wait (in seconds) before determining backend failure |
| [options.max_conns] | <code>Number</code> | how many concurrent connections a backend can handle |
| [options.ignore_invalid_backend_tls] | <code>Boolean</code> | ignore invalid/self-signed tls certs on backend |


* * *

<a name="module_CivoCloud/api.LoadBallancer..deleteLoadBalancer"></a>

#### LoadBallancer~deleteLoadBalancer(id) ⇒ <code>Promise</code>
deletes an existing load ballancer from the civo account [DELETE]

**Kind**: inner method of [<code>LoadBallancer</code>](#module_CivoCloud/api.LoadBallancer)  
**Returns**: <code>Promise</code> - resolves when load balancer is deleted or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/loadbalancer#deleting-a-load-balancer](https://www.civo.com/api/loadbalancer#deleting-a-load-balancer)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the id for the load balancers to delete |


* * *

<a name="module_CivoCloud/api.Network"></a>

### CivoCloud/api.Network ⇐ <code>module:CivoCloud/api.Civo</code>
**Kind**: static class of [<code>CivoCloud/api</code>](#module_CivoCloud/api)  
**Extends**: <code>module:CivoCloud/api.Civo</code>  
**See**: [https://www.civo.com/api/networks](https://www.civo.com/api/networks)  

* [.Network](#module_CivoCloud/api.Network) ⇐ <code>module:CivoCloud/api.Civo</code>
    * [~listNetworks()](#module_CivoCloud/api.Network..listNetworks) ⇒ <code>Promise</code>
    * [~createNetwork(label, [options])](#module_CivoCloud/api.Network..createNetwork) ⇒ <code>Promise</code>
    * [~renameNetwork(id, label)](#module_CivoCloud/api.Network..renameNetwork) ⇒ <code>Promise</code>
    * [~deleteNetwork(id)](#module_CivoCloud/api.Network..deleteNetwork) ⇒ <code>Promise</code>


* * *

<a name="module_CivoCloud/api.Network..listNetworks"></a>

#### Network~listNetworks() ⇒ <code>Promise</code>
gets an array of the private networks on civo cloud [GET]

**Kind**: inner method of [<code>Network</code>](#module_CivoCloud/api.Network)  
**Returns**: <code>Promise</code> - a promise wich resolves with the network list or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/networks#listing-the-private-networks](https://www.civo.com/api/networks#listing-the-private-networks)  

* * *

<a name="module_CivoCloud/api.Network..createNetwork"></a>

#### Network~createNetwork(label, [options]) ⇒ <code>Promise</code>
creates a new private network in civo [POST]

**Kind**: inner method of [<code>Network</code>](#module_CivoCloud/api.Network)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/networks#create-a-private-network](https://www.civo.com/api/networks#create-a-private-network)  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | the name to be used to identify the key in civo |
| [options] | <code>Object</code> | an optional options object |
| [options.region] | <code>String</code> | an optional region to create the network in |


* * *

<a name="module_CivoCloud/api.Network..renameNetwork"></a>

#### Network~renameNetwork(id, label) ⇒ <code>Promise</code>
renames an existing network within civo [PUT]

**Kind**: inner method of [<code>Network</code>](#module_CivoCloud/api.Network)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/networks#renaming-a-network](https://www.civo.com/api/networks#renaming-a-network)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the networks id to be used to identify the network in civo |
| label | <code>String</code> | the new label to be used for the network |


* * *

<a name="module_CivoCloud/api.Network..deleteNetwork"></a>

#### Network~deleteNetwork(id) ⇒ <code>Promise</code>
deletes an existing network within civo [DELETE]

**Kind**: inner method of [<code>Network</code>](#module_CivoCloud/api.Network)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/networks#removing-a-private-network](https://www.civo.com/api/networks#removing-a-private-network)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the networks id to be used to identify the network in civo |


* * *

<a name="module_CivoCloud/api.Quota"></a>

### CivoCloud/api.Quota ⇐ <code>module:CivoCloud/api.Civo</code>
**Kind**: static class of [<code>CivoCloud/api</code>](#module_CivoCloud/api)  
**Extends**: <code>module:CivoCloud/api.Civo</code>  
**See**: [https://www.civo.com/api/quota](https://www.civo.com/api/quota)  

* * *

<a name="module_CivoCloud/api.Quota..getQuota"></a>

#### Quota~getQuota() ⇒ <code>Promise</code>
gets an object of quota values [GET]

**Kind**: inner method of [<code>Quota</code>](#module_CivoCloud/api.Quota)  
**Access**: public  
**See**: [https://www.civo.com/api/quota#determining-current-quota](https://www.civo.com/api/quota#determining-current-quota)  

* * *

<a name="module_CivoCloud/api.Snapshot"></a>

### CivoCloud/api.Snapshot ⇐ <code>module:CivoCloud/api.Civo</code>
**Kind**: static class of [<code>CivoCloud/api</code>](#module_CivoCloud/api)  
**Extends**: <code>module:CivoCloud/api.Civo</code>  
**See**: [https://www.civo.com/api/snapshot](https://www.civo.com/api/snapshot)  

* [.Snapshot](#module_CivoCloud/api.Snapshot) ⇐ <code>module:CivoCloud/api.Civo</code>
    * [~listSnapshots()](#module_CivoCloud/api.Snapshot..listSnapshots) ⇒ <code>Promise</code>
    * [~createSnapshot(name, instance_id, safe)](#module_CivoCloud/api.Snapshot..createSnapshot) ⇒ <code>Promise</code>
    * [~updateSnapshot(name, instance_id, safe)](#module_CivoCloud/api.Snapshot..updateSnapshot) ⇒ <code>Promise</code>
    * [~deleteSnapshot(name)](#module_CivoCloud/api.Snapshot..deleteSnapshot) ⇒ <code>Promise</code>


* * *

<a name="module_CivoCloud/api.Snapshot..listSnapshots"></a>

#### Snapshot~listSnapshots() ⇒ <code>Promise</code>
gets an array of the snapshots on civo account [GET]

**Kind**: inner method of [<code>Snapshot</code>](#module_CivoCloud/api.Snapshot)  
**Returns**: <code>Promise</code> - a promise wich resolves with the foirewall list or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/snapshots#list-snapshots](https://www.civo.com/api/snapshots#list-snapshots)  

* * *

<a name="module_CivoCloud/api.Snapshot..createSnapshot"></a>

#### Snapshot~createSnapshot(name, instance_id, safe) ⇒ <code>Promise</code>
creates a snapshot of a given instance (alias of updateSnapshot) [PUT]

**Kind**: inner method of [<code>Snapshot</code>](#module_CivoCloud/api.Snapshot)  
**Returns**: <code>Promise</code> - a promise wich resolves with the foirewall list or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/snapshots#create-a-new-or-update-an-old-snapshot](https://www.civo.com/api/snapshots#create-a-new-or-update-an-old-snapshot)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | the new name of the snapshot |
| instance_id | <code>String</code> | the id of the instance to be snapshotted |
| safe | <code>Boolean</code> | determins if an instance is stopped before snapshotting |


* * *

<a name="module_CivoCloud/api.Snapshot..updateSnapshot"></a>

#### Snapshot~updateSnapshot(name, instance_id, safe) ⇒ <code>Promise</code>
updates a snapshot of a given instance [PUT]

**Kind**: inner method of [<code>Snapshot</code>](#module_CivoCloud/api.Snapshot)  
**Returns**: <code>Promise</code> - a promise wich resolves with the foirewall list or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/snapshots#create-a-new-or-update-an-old-snapshot](https://www.civo.com/api/snapshots#create-a-new-or-update-an-old-snapshot)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | the new name of the snapshot |
| instance_id | <code>String</code> | the id of the instance to be snapshotted |
| safe | <code>Boolean</code> | determins if an instance is stopped before snapshotting |


* * *

<a name="module_CivoCloud/api.Snapshot..deleteSnapshot"></a>

#### Snapshot~deleteSnapshot(name) ⇒ <code>Promise</code>
deletes an existing snapshot within civo [DELETE]

**Kind**: inner method of [<code>Snapshot</code>](#module_CivoCloud/api.Snapshot)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/snapshots#deleting-a-snapshot](https://www.civo.com/api/snapshots#deleting-a-snapshot)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | the snapshots name to be used to identify the network in civo |


* * *

<a name="module_CivoCloud/api.SSHKeys"></a>

### CivoCloud/api.SSHKeys ⇐ <code>module:CivoCloud/api.Civo</code>
**Kind**: static class of [<code>CivoCloud/api</code>](#module_CivoCloud/api)  
**Extends**: <code>module:CivoCloud/api.Civo</code>  
**See**: [https://www.civo.com/api/sshkeys](https://www.civo.com/api/sshkeys)  

* [.SSHKeys](#module_CivoCloud/api.SSHKeys) ⇐ <code>module:CivoCloud/api.Civo</code>
    * [~listSSHKeys()](#module_CivoCloud/api.SSHKeys..listSSHKeys) ⇒ <code>Promise</code>
    * [~uploadSSHKey(name, public_key)](#module_CivoCloud/api.SSHKeys..uploadSSHKey) ⇒ <code>Promise</code>
    * [~deleteSSHKey(name)](#module_CivoCloud/api.SSHKeys..deleteSSHKey) ⇒ <code>Promise</code>


* * *

<a name="module_CivoCloud/api.SSHKeys..listSSHKeys"></a>

#### SSHKeys~listSSHKeys() ⇒ <code>Promise</code>
gets an array of the currently available ssh keys on civo cloud [GET]

**Kind**: inner method of [<code>SSHKeys</code>](#module_CivoCloud/api.SSHKeys)  
**Returns**: <code>Promise</code> - a promise which resolves with the sshkeys list or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/sshkeys#listing-the-ssh-keys](https://www.civo.com/api/sshkeys#listing-the-ssh-keys)  

* * *

<a name="module_CivoCloud/api.SSHKeys..uploadSSHKey"></a>

#### SSHKeys~uploadSSHKey(name, public_key) ⇒ <code>Promise</code>
uploads a supplied ssh key into civo [POST]

**Kind**: inner method of [<code>SSHKeys</code>](#module_CivoCloud/api.SSHKeys)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result and id or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/sshkeys#uploading-an-ssh-key](https://www.civo.com/api/sshkeys#uploading-an-ssh-key)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | the name to be used to identify the key in civo |
| public_key | <code>String</code> | the public key string to be uploaded |


* * *

<a name="module_CivoCloud/api.SSHKeys..deleteSSHKey"></a>

#### SSHKeys~deleteSSHKey(name) ⇒ <code>Promise</code>
gets an array of the currently available ssh keys on civo cloud [DELETE]

**Kind**: inner method of [<code>SSHKeys</code>](#module_CivoCloud/api.SSHKeys)  
**Returns**: <code>Promise</code> - a promise wich resolves with the sshkeys list or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/sshkeys#removing-an-ssh-key](https://www.civo.com/api/sshkeys#removing-an-ssh-key)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | the name of the public key to delete |


* * *

<a name="module_CivoCloud/api.Template"></a>

### CivoCloud/api.Template ⇐ <code>module:CivoCloud/api.Civo</code>
**Kind**: static class of [<code>CivoCloud/api</code>](#module_CivoCloud/api)  
**Extends**: <code>module:CivoCloud/api.Civo</code>  
**See**: [https://www.civo.com/api/templates](https://www.civo.com/api/templates)  

* [.Template](#module_CivoCloud/api.Template) ⇐ <code>module:CivoCloud/api.Civo</code>
    * [~listTemplates()](#module_CivoCloud/api.Template..listTemplates) ⇒ <code>Promise</code>
    * [~createTemplate(name, image_id, [options])](#module_CivoCloud/api.Template..createTemplate) ⇒ <code>Promise</code>
    * [~updateTemplate(id, [options])](#module_CivoCloud/api.Template..updateTemplate) ⇒ <code>Promise</code>
    * [~deleteTemplate(id)](#module_CivoCloud/api.Template..deleteTemplate) ⇒ <code>Promise</code>


* * *

<a name="module_CivoCloud/api.Template..listTemplates"></a>

#### Template~listTemplates() ⇒ <code>Promise</code>
gets an array of the currently available templates on civo cloud [GET]

**Kind**: inner method of [<code>Template</code>](#module_CivoCloud/api.Template)  
**Returns**: <code>Promise</code> - a promise wich resolves with the available region list or rejects with an
error  
**Access**: public  
**See**: [https://www.civo.com/api/templates#listing-available-templates](https://www.civo.com/api/templates#listing-available-templates)  

* * *

<a name="module_CivoCloud/api.Template..createTemplate"></a>

#### Template~createTemplate(name, image_id, [options]) ⇒ <code>Promise</code>
creates a new template on the civo account [POST]

**Kind**: inner method of [<code>Template</code>](#module_CivoCloud/api.Template)  
**Returns**: <code>Promise</code> - a promise wich resolves with the available region list or rejects with an
error  
**Access**: public  
**See**: [https://www.civo.com/api/templates#create-a-new-template](https://www.civo.com/api/templates#create-a-new-template)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | a readable name for the custom template |
| image_id | <code>String</code> | an openstack glance image id |
| [options] | <code>Object</code> | an optional object |
| [options.short_description] | <code>String</code> | an optional one line description of the template |
| [options.description] | <code>String</code> | an optional full description of the template |
| [options.default_username] | <code>String</code> | an optional udername to be created within the new template |
| [options.cloud_config] | <code>String</code> | an optional customisation script to run after the instance is first booted |


* * *

<a name="module_CivoCloud/api.Template..updateTemplate"></a>

#### Template~updateTemplate(id, [options]) ⇒ <code>Promise</code>
updates an existing template on the civo account [PUT]

**Kind**: inner method of [<code>Template</code>](#module_CivoCloud/api.Template)  
**Returns**: <code>Promise</code> - a promise wich resolves with the available region list or rejects with an
error  
**Access**: public  
**See**: [https://www.civo.com/api/templates#update-a-template](https://www.civo.com/api/templates#update-a-template)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the templates id to be used to identify the network in civo |
| [options] | <code>Object</code> | an optional object |
| [options.name] | <code>String</code> | a readable name for the custom template |
| [options.short_description] | <code>String</code> | an optional one line description of the template |
| [options.description] | <code>String</code> | an optional full description of the template |
| [options.default_username] | <code>String</code> | an optional udername to be created within the new template |
| [options.cloud_config] | <code>String</code> | an optional customisation script to run after the instance is first booted |


* * *

<a name="module_CivoCloud/api.Template..deleteTemplate"></a>

#### Template~deleteTemplate(id) ⇒ <code>Promise</code>
deletes an existing template within civo [DELETE]

**Kind**: inner method of [<code>Template</code>](#module_CivoCloud/api.Template)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/templates#deleting-a-template](https://www.civo.com/api/templates#deleting-a-template)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the templates id to be used to identify the network in civo |


* * *

<a name="module_CivoCloud/api.Webhook"></a>

### CivoCloud/api.Webhook ⇐ <code>module:CivoCloud/api.Civo</code>
**Kind**: static class of [<code>CivoCloud/api</code>](#module_CivoCloud/api)  
**Extends**: <code>module:CivoCloud/api.Civo</code>  
**See**: [https://www.civo.com/api/webhooks](https://www.civo.com/api/webhooks)  

* [.Webhook](#module_CivoCloud/api.Webhook) ⇐ <code>module:CivoCloud/api.Civo</code>
    * [~listWebhooks()](#module_CivoCloud/api.Webhook..listWebhooks) ⇒ <code>Promise</code>
    * [~createWebhook(url, [options])](#module_CivoCloud/api.Webhook..createWebhook) ⇒ <code>Promise</code>
    * [~deleteWebhook(id)](#module_CivoCloud/api.Webhook..deleteWebhook) ⇒ <code>Promise</code>
    * [~testWebhook(id)](#module_CivoCloud/api.Webhook..testWebhook) ⇒ <code>Promise</code>
    * [~updateWebhook(id, [options])](#module_CivoCloud/api.Webhook..updateWebhook) ⇒ <code>Promise</code>


* * *

<a name="module_CivoCloud/api.Webhook..listWebhooks"></a>

#### Webhook~listWebhooks() ⇒ <code>Promise</code>
gets an array of the currently available ebhooks sizes on civo cloud [GET]

**Kind**: inner method of [<code>Webhook</code>](#module_CivoCloud/api.Webhook)  
**Returns**: <code>Promise</code> - a promise wich resolves with the webhook list or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/webhooks#list-webhooks](https://www.civo.com/api/webhooks#list-webhooks)  

* * *

<a name="module_CivoCloud/api.Webhook..createWebhook"></a>

#### Webhook~createWebhook(url, [options]) ⇒ <code>Promise</code>
creates and registers a new webhook onto the civo account. [POST]

**Kind**: inner method of [<code>Webhook</code>](#module_CivoCloud/api.Webhook)  
**Returns**: <code>Promise</code> - resolves with the newly created webhook or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/webhooks#create-a-new-webhook](https://www.civo.com/api/webhooks#create-a-new-webhook)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| url | <code>String</code> |  | a url to send the webhook request too |
| [options] | <code>Object</code> |  | an object for options |
| [options.events] | <code>Array.&lt;String&gt;</code> \| <code>String</code> | <code>all events</code> | an array of event names to subscribe to |
| [options.secret] | <code>String</code> | <code>random string</code> | a secret to send with webhook requests |


* * *

<a name="module_CivoCloud/api.Webhook..deleteWebhook"></a>

#### Webhook~deleteWebhook(id) ⇒ <code>Promise</code>
deletes an existing webhook within civo [DELETE]

**Kind**: inner method of [<code>Webhook</code>](#module_CivoCloud/api.Webhook)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/webhooks#deleting-a-webhook](https://www.civo.com/api/webhooks#deleting-a-webhook)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the webhook id to be used to identify which webhook to delete in civo |


* * *

<a name="module_CivoCloud/api.Webhook..testWebhook"></a>

#### Webhook~testWebhook(id) ⇒ <code>Promise</code>
sends a dummy payload to the specific webhook in order to test it [POST]

**Kind**: inner method of [<code>Webhook</code>](#module_CivoCloud/api.Webhook)  
**Returns**: <code>Promise</code> - resolves when the tummy payload is sent or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/webhooks#test-a-webhook](https://www.civo.com/api/webhooks#test-a-webhook)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the id for the specific webhook to test |


* * *

<a name="module_CivoCloud/api.Webhook..updateWebhook"></a>

#### Webhook~updateWebhook(id, [options]) ⇒ <code>Promise</code>
creates and registers a new webhook onto the civo account. [PUT]

**Kind**: inner method of [<code>Webhook</code>](#module_CivoCloud/api.Webhook)  
**Returns**: <code>Promise</code> - resolves with the newly created webhook or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/webhooks#create-a-new-webhook](https://www.civo.com/api/webhooks#create-a-new-webhook)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the id for the specific webhook |
| [options] | <code>Object</code> | an object for options |
| [options.url] | <code>String</code> | a url to send the webhook request too |
| [options.events] | <code>Array.&lt;String&gt;</code> \| <code>String</code> | an array of event names to subscribe to |
| [options.secret] | <code>String</code> | a secret to send with webhook requests |


* * *

<a name="Backend"></a>

## Backend : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| [instance_id] | <code>String</code> | the backend instance_id |
| [protocol] | <code>String</code> | the protocol to communicate with the backend on (either 'http' or 'https') |
| [port] | <code>Number</code> | the port to communicate with the backend on |


* * *

