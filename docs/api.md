## Modules

<dl>
<dt><a href="#module_civocloud">civocloud</a></dt>
<dd><p>a node.js module which provides access to the Civo v2 API</p>
</dd>
</dl>

## Mixins

<dl>
<dt><a href="#ChargesAPI">ChargesAPI</a></dt>
<dd></dd>
<dt><a href="#DomainAPI">DomainAPI</a></dt>
<dd></dd>
<dt><a href="#FirewallAPI">FirewallAPI</a></dt>
<dd></dd>
<dt><a href="#InstanceAPI">InstanceAPI</a></dt>
<dd></dd>
<dt><a href="#InstanceRegionAPI">InstanceRegionAPI</a></dt>
<dd></dd>
<dt><a href="#InstanceSizingAPI">InstanceSizingAPI</a></dt>
<dd></dd>
<dt><a href="#LoadBallancerAPI">LoadBallancerAPI</a></dt>
<dd></dd>
<dt><a href="#NetworkAPI">NetworkAPI</a></dt>
<dd></dd>
<dt><a href="#QuotaAPI">QuotaAPI</a></dt>
<dd></dd>
<dt><a href="#SnapshotAPI">SnapshotAPI</a></dt>
<dd></dd>
<dt><a href="#SSHKeysAPI">SSHKeysAPI</a></dt>
<dd></dd>
<dt><a href="#TemplateAPI">TemplateAPI</a></dt>
<dd></dd>
</dl>

## Typedefs

<dl>
<dt><a href="#Backend">Backend</a> : <code>Object</code></dt>
<dd></dd>
</dl>

<a name="module_civocloud"></a>

## civocloud
a node.js module which provides access to the Civo v2 API


* [civocloud](#module_civocloud)
    * [~Civo](#module_civocloud..Civo)
        * [new Civo(apiToken, [endpoint])](#new_module_civocloud..Civo_new)

<a name="module_civocloud..Civo"></a>

### civocloud~Civo
The full class with all of the api functions

**Kind**: inner class of [<code>civocloud</code>](#module_civocloud)  
**Mixes**: [<code>ChargesAPI</code>](#ChargesAPI), [<code>DomainAPI</code>](#DomainAPI), [<code>FirewallAPI</code>](#FirewallAPI), [<code>InstanceAPI</code>](#InstanceAPI), [<code>InstanceRegionAPI</code>](#InstanceRegionAPI), [<code>InstanceSizingAPI</code>](#InstanceSizingAPI), [<code>LoadBallancerAPI</code>](#LoadBallancerAPI), [<code>NetworkAPI</code>](#NetworkAPI), [<code>QuotaAPI</code>](#QuotaAPI), [<code>SnapshotAPI</code>](#SnapshotAPI), [<code>SSHKeysAPI</code>](#SSHKeysAPI), [<code>TemplateAPI</code>](#TemplateAPI)  
<a name="new_module_civocloud..Civo_new"></a>

#### new Civo(apiToken, [endpoint])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| apiToken | <code>String</code> |  | the provided api token from your civo account |
| [endpoint] | <code>String</code> | <code>&#x27;https://api.civo.com/v2&#x27;</code> | An optional end point |

<a name="ChargesAPI"></a>

## ChargesAPI
**Kind**: global mixin  
<a name="ChargesAPI..listCharges"></a>

### ChargesAPI~listCharges([options]) ⇒ <code>Promise</code>
gets an array of chargable service hours

**Kind**: inner method of [<code>ChargesAPI</code>](#ChargesAPI)  
**Access**: public  
**See**: [https://www.civo.com/api/charges#listing-charges](https://www.civo.com/api/charges#listing-charges)  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>Object</code> | an optional options object |
| [options.from] | <code>String</code> \| <code>Date</code> | optional from date range |
| [options.to] | <code>String</code> \| <code>Date</code> | optional to date range (max 31 days) |

<a name="DomainAPI"></a>

## DomainAPI
**Kind**: global mixin  

* [DomainAPI](#DomainAPI)
    * [~listDomains()](#DomainAPI..listDomains) ⇒ <code>Promise</code>
    * [~createDomain(name)](#DomainAPI..createDomain) ⇒ <code>Promise</code>
    * [~deleteDomain(id)](#DomainAPI..deleteDomain) ⇒ <code>Promise</code>
    * [~listDomainRecords(id)](#DomainAPI..listDomainRecords) ⇒ <code>Promise</code>
    * [~createDomainRecord(domain_id, type, name, value, [options])](#DomainAPI..createDomainRecord) ⇒ <code>Promise</code>
    * [~deleteDomainRecord(domain_id, id)](#DomainAPI..deleteDomainRecord) ⇒ <code>Promise</code>

<a name="DomainAPI..listDomains"></a>

### DomainAPI~listDomains() ⇒ <code>Promise</code>
gets an array of the domains on civo account

**Kind**: inner method of [<code>DomainAPI</code>](#DomainAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the foirewall list or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/dns#list-domain-names](https://www.civo.com/api/dns#list-domain-names)  
<a name="DomainAPI..createDomain"></a>

### DomainAPI~createDomain(name) ⇒ <code>Promise</code>
creates a new domain within civo

**Kind**: inner method of [<code>DomainAPI</code>](#DomainAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/dns#setup-a-new-domain](https://www.civo.com/api/dns#setup-a-new-domain)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | the ndomain name for the new domain |

<a name="DomainAPI..deleteDomain"></a>

### DomainAPI~deleteDomain(id) ⇒ <code>Promise</code>
removes a new domain within civo

**Kind**: inner method of [<code>DomainAPI</code>](#DomainAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/dns#deleting-a-domain](https://www.civo.com/api/dns#deleting-a-domain)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the domain id to be deleted |

<a name="DomainAPI..listDomainRecords"></a>

### DomainAPI~listDomainRecords(id) ⇒ <code>Promise</code>
gets an array of the domains on civo account

**Kind**: inner method of [<code>DomainAPI</code>](#DomainAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the foirewall list or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/dns#list-dns-records](https://www.civo.com/api/dns#list-dns-records)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the domains id to get the records in |

<a name="DomainAPI..createDomainRecord"></a>

### DomainAPI~createDomainRecord(domain_id, type, name, value, [options]) ⇒ <code>Promise</code>
gets an array of the domains on civo account

**Kind**: inner method of [<code>DomainAPI</code>](#DomainAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the foirewall list or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/dns#create-a-new-dns-record](https://www.civo.com/api/dns#create-a-new-dns-record)  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| domain_id | <code>String</code> |  | the domain to delete the record from |
| type | <code>String</code> |  | the type of dns record to use which can be either: 'a', 'cname', 'mx',  or 'txt' |
| name | <code>String</code> |  | the portion before the domain name (e.g. 'www', or '@') |
| value | <code>Stirng</code> |  | the ip address fr this dns record to serve |
| [options] | <code>Object</code> |  | an optional options object |
| [options.priority] | <code>Number</code> | <code>10</code> | mx records only but determines the priority of the |
| [options.ttl] | <code>Number</code> | <code>3600</code> | the time to live for the dns record in seconds |

<a name="DomainAPI..deleteDomainRecord"></a>

### DomainAPI~deleteDomainRecord(domain_id, id) ⇒ <code>Promise</code>
removes a new domain within civo

**Kind**: inner method of [<code>DomainAPI</code>](#DomainAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/dns#deleting-a-dns-record](https://www.civo.com/api/dns#deleting-a-dns-record)  

| Param | Type | Description |
| --- | --- | --- |
| domain_id | <code>String</code> | the domain to delete the record from |
| id | <code>String</code> | the record to be deleted |

<a name="FirewallAPI"></a>

## FirewallAPI
**Kind**: global mixin  

* [FirewallAPI](#FirewallAPI)
    * [~listFirewalls()](#FirewallAPI..listFirewalls) ⇒ <code>Promise</code>
    * [~createFirewall(name)](#FirewallAPI..createFirewall) ⇒ <code>Promise</code>
    * [~deleteFirewall(id)](#FirewallAPI..deleteFirewall) ⇒ <code>Promise</code>
    * [~listFirewallRules(id)](#FirewallAPI..listFirewallRules) ⇒ <code>Promise</code>
    * [~createFirewallRule(id, start_port, [options])](#FirewallAPI..createFirewallRule) ⇒ <code>Promise</code>
    * [~deleteFirewallRule(firewall_id, id)](#FirewallAPI..deleteFirewallRule) ⇒ <code>Promise</code>

<a name="FirewallAPI..listFirewalls"></a>

### FirewallAPI~listFirewalls() ⇒ <code>Promise</code>
gets an array of the firewalls on civo account

**Kind**: inner method of [<code>FirewallAPI</code>](#FirewallAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the foirewall list or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/firewall#list-firewalls](https://www.civo.com/api/firewall#list-firewalls)  
<a name="FirewallAPI..createFirewall"></a>

### FirewallAPI~createFirewall(name) ⇒ <code>Promise</code>
creates a new firewall in civo

**Kind**: inner method of [<code>FirewallAPI</code>](#FirewallAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/firewall#create-a-new-firewall](https://www.civo.com/api/firewall#create-a-new-firewall)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | the name to be used to identify the firewall in civo |

<a name="FirewallAPI..deleteFirewall"></a>

### FirewallAPI~deleteFirewall(id) ⇒ <code>Promise</code>
deletes an existing firewall within civo

**Kind**: inner method of [<code>FirewallAPI</code>](#FirewallAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/firewall#deleting-a-firewall](https://www.civo.com/api/firewall#deleting-a-firewall)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the firewalls id to be used to identify the network in civo |

<a name="FirewallAPI..listFirewallRules"></a>

### FirewallAPI~listFirewallRules(id) ⇒ <code>Promise</code>
gets an array of the firewalls rules on civo account

**Kind**: inner method of [<code>FirewallAPI</code>](#FirewallAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the foirewall list or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/firewall#list-firewall-rules](https://www.civo.com/api/firewall#list-firewall-rules)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the firewalls id to be used to identify the network in civo |

<a name="FirewallAPI..createFirewallRule"></a>

### FirewallAPI~createFirewallRule(id, start_port, [options]) ⇒ <code>Promise</code>
creates a new firewall rule within an existing firewall

**Kind**: inner method of [<code>FirewallAPI</code>](#FirewallAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with a success or rejects with an error  
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

<a name="FirewallAPI..deleteFirewallRule"></a>

### FirewallAPI~deleteFirewallRule(firewall_id, id) ⇒ <code>Promise</code>
deletes an existing firewall rule within a firewall

**Kind**: inner method of [<code>FirewallAPI</code>](#FirewallAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/firewall#deleting-a-firewall-rule](https://www.civo.com/api/firewall#deleting-a-firewall-rule)  

| Param | Type | Description |
| --- | --- | --- |
| firewall_id | <code>String</code> | the firewalls id to be used to identify in civo |
| id | <code>String</code> | the firewall rules id in civo |

<a name="InstanceAPI"></a>

## InstanceAPI
**Kind**: global mixin  

* [InstanceAPI](#InstanceAPI)
    * [~listInstances()](#InstanceAPI..listInstances) ⇒ <code>Promise</code>
    * [~createInstance(size, network_id, hostname, [options])](#InstanceAPI..createInstance) ⇒ <code>Promise</code>
    * [~deleteInstance(id)](#InstanceAPI..deleteInstance) ⇒ <code>Promise</code>
    * [~getInstance(id)](#InstanceAPI..getInstance) ⇒ <code>Promise</code>
    * [~retagInstance(id, [options])](#InstanceAPI..retagInstance) ⇒ <code>Promise</code>
    * [~rebootInstance(id)](#InstanceAPI..rebootInstance) ⇒ <code>Promise</code>
    * [~hardRebootInstance(id)](#InstanceAPI..hardRebootInstance) ⇒ <code>Promise</code>
    * [~softRebootInstance(id)](#InstanceAPI..softRebootInstance) ⇒ <code>Promise</code>
    * [~stopInstance(id)](#InstanceAPI..stopInstance) ⇒ <code>Promise</code>
    * [~startInstance(id)](#InstanceAPI..startInstance) ⇒ <code>Promise</code>
    * [~resizeInstance(id, size)](#InstanceAPI..resizeInstance) ⇒ <code>Promise</code>
    * [~rebuildInstance(id)](#InstanceAPI..rebuildInstance) ⇒ <code>Promise</code>
    * [~restoreInstance(id, snapshot)](#InstanceAPI..restoreInstance) ⇒ <code>Promise</code>
    * [~updateInstanceFirewall(id, [options])](#InstanceAPI..updateInstanceFirewall) ⇒ <code>Promise</code>
    * [~movePublicIpToInstance(id, ip_address)](#InstanceAPI..movePublicIpToInstance) ⇒ <code>Promise</code>

<a name="InstanceAPI..listInstances"></a>

### InstanceAPI~listInstances() ⇒ <code>Promise</code>
gets an array of the instances on civo cloud

**Kind**: inner method of [<code>InstanceAPI</code>](#InstanceAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the instance list or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/instances#list-instances](https://www.civo.com/api/instances#list-instances)  
<a name="InstanceAPI..createInstance"></a>

### InstanceAPI~createInstance(size, network_id, hostname, [options]) ⇒ <code>Promise</code>
creates a new instance network in civo

**Kind**: inner method of [<code>InstanceAPI</code>](#InstanceAPI)  
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

<a name="InstanceAPI..deleteInstance"></a>

### InstanceAPI~deleteInstance(id) ⇒ <code>Promise</code>
deletes an existing instance within civo

**Kind**: inner method of [<code>InstanceAPI</code>](#InstanceAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/instances#deleting-an-instance](https://www.civo.com/api/instances#deleting-an-instance)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the instance id to be used to identify the instance in civo |

<a name="InstanceAPI..getInstance"></a>

### InstanceAPI~getInstance(id) ⇒ <code>Promise</code>
gets an existing instance from civo

**Kind**: inner method of [<code>InstanceAPI</code>](#InstanceAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/instances#retrieving-an-instance](https://www.civo.com/api/instances#retrieving-an-instance)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the instance id to be used to identify the instance in civo |

<a name="InstanceAPI..retagInstance"></a>

### InstanceAPI~retagInstance(id, [options]) ⇒ <code>Promise</code>
updates the tags on an existing instance in civo

**Kind**: inner method of [<code>InstanceAPI</code>](#InstanceAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/instances#retagging-an-instance](https://www.civo.com/api/instances#retagging-an-instance)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the instance id to be used to identify the instance in civo |
| [options] | <code>Object</code> | an optional options object |
| [options.tags] | <code>String</code> \| <code>Array.&lt;String&gt;</code> | a space seperated string of tags or an array of tags |

<a name="InstanceAPI..rebootInstance"></a>

### InstanceAPI~rebootInstance(id) ⇒ <code>Promise</code>
reboots an instance in civo

**Kind**: inner method of [<code>InstanceAPI</code>](#InstanceAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/instances#rebooting-an-instance](https://www.civo.com/api/instances#rebooting-an-instance)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the instance id to be used to identify the instance in civo |

<a name="InstanceAPI..hardRebootInstance"></a>

### InstanceAPI~hardRebootInstance(id) ⇒ <code>Promise</code>
hard reboots an instance in civo

**Kind**: inner method of [<code>InstanceAPI</code>](#InstanceAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/instances#rebooting-an-instance](https://www.civo.com/api/instances#rebooting-an-instance)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the instance id to be used to identify the instance in civo |

<a name="InstanceAPI..softRebootInstance"></a>

### InstanceAPI~softRebootInstance(id) ⇒ <code>Promise</code>
soft reboots an instance in civo

**Kind**: inner method of [<code>InstanceAPI</code>](#InstanceAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/instances#rebooting-an-instance](https://www.civo.com/api/instances#rebooting-an-instance)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the instance id to be used to identify the instance in civo |

<a name="InstanceAPI..stopInstance"></a>

### InstanceAPI~stopInstance(id) ⇒ <code>Promise</code>
stops (shutdown) an instance in civo

**Kind**: inner method of [<code>InstanceAPI</code>](#InstanceAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/instances#shutting-down-an-instance](https://www.civo.com/api/instances#shutting-down-an-instance)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the instance id to be used to identify the instance in civo |

<a name="InstanceAPI..startInstance"></a>

### InstanceAPI~startInstance(id) ⇒ <code>Promise</code>
starts an instance in civo

**Kind**: inner method of [<code>InstanceAPI</code>](#InstanceAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/instances#starting-an-instance-after-being-shut-down](https://www.civo.com/api/instances#starting-an-instance-after-being-shut-down)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the instance id to be used to identify the instance in civo |

<a name="InstanceAPI..resizeInstance"></a>

### InstanceAPI~resizeInstance(id, size) ⇒ <code>Promise</code>
resizes an instance in civo

**Kind**: inner method of [<code>InstanceAPI</code>](#InstanceAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/instances#updating-resizing-an-instance](https://www.civo.com/api/instances#updating-resizing-an-instance)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the instance id to be used to identify the instance in civo |
| size | <code>String</code> | the new size to resize the exsting instance to |

<a name="InstanceAPI..rebuildInstance"></a>

### InstanceAPI~rebuildInstance(id) ⇒ <code>Promise</code>
rebuilds an instance in civo

**Kind**: inner method of [<code>InstanceAPI</code>](#InstanceAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/instances#rebuilding-an-instance](https://www.civo.com/api/instances#rebuilding-an-instance)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the instance id to be used to identify the instance in civo |

<a name="InstanceAPI..restoreInstance"></a>

### InstanceAPI~restoreInstance(id, snapshot) ⇒ <code>Promise</code>
restores an instance in civo from a snapshot

**Kind**: inner method of [<code>InstanceAPI</code>](#InstanceAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/instances#restoring-an-instance-from-a-snapshot](https://www.civo.com/api/instances#restoring-an-instance-from-a-snapshot)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the instance id to be used to identify the instance in civo |
| snapshot | <code>String</code> | the snapshot id to specify which snapshot to restore |

<a name="InstanceAPI..updateInstanceFirewall"></a>

### InstanceAPI~updateInstanceFirewall(id, [options]) ⇒ <code>Promise</code>
Applies a firewall to an instance

**Kind**: inner method of [<code>InstanceAPI</code>](#InstanceAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/instances#setting-the-firewall-for-an-instance](https://www.civo.com/api/instances#setting-the-firewall-for-an-instance)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the instance id to be used to identify the instance in civo |
| [options] | <code>Object</code> | an optional options object |
| [options.firewall_id] | <code>String</code> | the firewall id to specify which firewall to apply |

<a name="InstanceAPI..movePublicIpToInstance"></a>

### InstanceAPI~movePublicIpToInstance(id, ip_address) ⇒ <code>Promise</code>
Moves an owned public ip address from one instance you own to another instance

**Kind**: inner method of [<code>InstanceAPI</code>](#InstanceAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/instances#moving-a-public-ip-between-instances](https://www.civo.com/api/instances#moving-a-public-ip-between-instances)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the instance id to be used to identify the instance in civo |
| ip_address | <code>String</code> | the ip address to move to this instance |

<a name="InstanceRegionAPI"></a>

## InstanceRegionAPI
**Kind**: global mixin  
<a name="InstanceRegionAPI..listRegions"></a>

### InstanceRegionAPI~listRegions() ⇒ <code>Promise</code>
gets an array of the currently available regions on civo cloud

**Kind**: inner method of [<code>InstanceRegionAPI</code>](#InstanceRegionAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the available region list or rejects with an
error  
**Access**: public  
**See**: [https://www.civo.com/api/regions#listing-available-regions](https://www.civo.com/api/regions#listing-available-regions)  
<a name="InstanceSizingAPI"></a>

## InstanceSizingAPI
**Kind**: global mixin  
<a name="InstanceSizingAPI..listInstanceSizes"></a>

### InstanceSizingAPI~listInstanceSizes() ⇒ <code>Promise</code>
gets an array of the currently available instance sizes on civo cloud

**Kind**: inner method of [<code>InstanceSizingAPI</code>](#InstanceSizingAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the instance size list or rejects with an
error  
**Access**: public  
**See**: [https://www.civo.com/api/sizes#listing-available-sizes](https://www.civo.com/api/sizes#listing-available-sizes)  
<a name="LoadBallancerAPI"></a>

## LoadBallancerAPI
**Kind**: global mixin  

* [LoadBallancerAPI](#LoadBallancerAPI)
    * [~listLoadBalancers()](#LoadBallancerAPI..listLoadBalancers) ⇒ <code>Promise</code>
    * [~createLoadBalancer(hostname, backends, [options])](#LoadBallancerAPI..createLoadBalancer) ⇒ <code>Promise</code>
    * [~updateLoadBalancer(id, [options])](#LoadBallancerAPI..updateLoadBalancer) ⇒ <code>Promise</code>
    * [~deleteLoadBalancer(id)](#LoadBallancerAPI..deleteLoadBalancer) ⇒ <code>Promise</code>

<a name="LoadBallancerAPI..listLoadBalancers"></a>

### LoadBallancerAPI~listLoadBalancers() ⇒ <code>Promise</code>
Lists all of the available load ballancers on the civo account

**Kind**: inner method of [<code>LoadBallancerAPI</code>](#LoadBallancerAPI)  
**Returns**: <code>Promise</code> - resolves with a list of available load balancers or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/loadbalancer#list-load-balancers](https://www.civo.com/api/loadbalancer#list-load-balancers)  
<a name="LoadBallancerAPI..createLoadBalancer"></a>

### LoadBallancerAPI~createLoadBalancer(hostname, backends, [options]) ⇒ <code>Promise</code>
Creates a new load ballancer on the civo account

**Kind**: inner method of [<code>LoadBallancerAPI</code>](#LoadBallancerAPI)  
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

<a name="LoadBallancerAPI..updateLoadBalancer"></a>

### LoadBallancerAPI~updateLoadBalancer(id, [options]) ⇒ <code>Promise</code>
updates an existing load ballancer with new information

**Kind**: inner method of [<code>LoadBallancerAPI</code>](#LoadBallancerAPI)  
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

<a name="LoadBallancerAPI..deleteLoadBalancer"></a>

### LoadBallancerAPI~deleteLoadBalancer(id) ⇒ <code>Promise</code>
deletes an existing load ballancer from the civo account

**Kind**: inner method of [<code>LoadBallancerAPI</code>](#LoadBallancerAPI)  
**Returns**: <code>Promise</code> - resolves when load balancer is deleted or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/loadbalancer#deleting-a-load-balancer](https://www.civo.com/api/loadbalancer#deleting-a-load-balancer)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the id for the load balancers to delete |

<a name="NetworkAPI"></a>

## NetworkAPI
**Kind**: global mixin  

* [NetworkAPI](#NetworkAPI)
    * [~listNetworks()](#NetworkAPI..listNetworks) ⇒ <code>Promise</code>
    * [~createNetwork(label, [options])](#NetworkAPI..createNetwork) ⇒ <code>Promise</code>
    * [~renameNetwork(id, label)](#NetworkAPI..renameNetwork) ⇒ <code>Promise</code>
    * [~deleteNetwork(id)](#NetworkAPI..deleteNetwork) ⇒ <code>Promise</code>

<a name="NetworkAPI..listNetworks"></a>

### NetworkAPI~listNetworks() ⇒ <code>Promise</code>
gets an array of the private networks on civo cloud

**Kind**: inner method of [<code>NetworkAPI</code>](#NetworkAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the network list or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/networks#listing-the-private-networks](https://www.civo.com/api/networks#listing-the-private-networks)  
<a name="NetworkAPI..createNetwork"></a>

### NetworkAPI~createNetwork(label, [options]) ⇒ <code>Promise</code>
creates a new private network in civo

**Kind**: inner method of [<code>NetworkAPI</code>](#NetworkAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/networks#create-a-private-network](https://www.civo.com/api/networks#create-a-private-network)  

| Param | Type | Description |
| --- | --- | --- |
| label | <code>String</code> | the name to be used to identify the key in civo |
| [options] | <code>Object</code> | an optional options object |
| [options.region] | <code>String</code> | an optional region to create the network in |

<a name="NetworkAPI..renameNetwork"></a>

### NetworkAPI~renameNetwork(id, label) ⇒ <code>Promise</code>
renames an existing network within civo

**Kind**: inner method of [<code>NetworkAPI</code>](#NetworkAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/networks#renaming-a-network](https://www.civo.com/api/networks#renaming-a-network)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the networks id to be used to identify the network in civo |
| label | <code>String</code> | the new label to be used for the network |

<a name="NetworkAPI..deleteNetwork"></a>

### NetworkAPI~deleteNetwork(id) ⇒ <code>Promise</code>
deletes an existing network within civo

**Kind**: inner method of [<code>NetworkAPI</code>](#NetworkAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/networks#removing-a-private-network](https://www.civo.com/api/networks#removing-a-private-network)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the networks id to be used to identify the network in civo |

<a name="QuotaAPI"></a>

## QuotaAPI
**Kind**: global mixin  
<a name="QuotaAPI..getQuota"></a>

### QuotaAPI~getQuota() ⇒ <code>Promise</code>
gets an object of quota values

**Kind**: inner method of [<code>QuotaAPI</code>](#QuotaAPI)  
**Access**: public  
**See**: [https://www.civo.com/api/quota#determining-current-quota](https://www.civo.com/api/quota#determining-current-quota)  
<a name="SnapshotAPI"></a>

## SnapshotAPI
**Kind**: global mixin  

* [SnapshotAPI](#SnapshotAPI)
    * [~listSnapshots()](#SnapshotAPI..listSnapshots) ⇒ <code>Promise</code>
    * [~createSnapshot(name, instance_id, safe)](#SnapshotAPI..createSnapshot) ⇒ <code>Promise</code>
    * [~updateSnapshot(name, instance_id, safe)](#SnapshotAPI..updateSnapshot) ⇒ <code>Promise</code>
    * [~deleteSnapshot(name)](#SnapshotAPI..deleteSnapshot) ⇒ <code>Promise</code>

<a name="SnapshotAPI..listSnapshots"></a>

### SnapshotAPI~listSnapshots() ⇒ <code>Promise</code>
gets an array of the snapshots on civo account

**Kind**: inner method of [<code>SnapshotAPI</code>](#SnapshotAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the foirewall list or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/snapshots#list-snapshots](https://www.civo.com/api/snapshots#list-snapshots)  
<a name="SnapshotAPI..createSnapshot"></a>

### SnapshotAPI~createSnapshot(name, instance_id, safe) ⇒ <code>Promise</code>
creates a snapshot of a given instance (alias of updateSnapshot)

**Kind**: inner method of [<code>SnapshotAPI</code>](#SnapshotAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the foirewall list or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/snapshots#create-a-new-or-update-an-old-snapshot](https://www.civo.com/api/snapshots#create-a-new-or-update-an-old-snapshot)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | the new name of the snapshot |
| instance_id | <code>String</code> | the id of the instance to be snapshotted |
| safe | <code>Boolean</code> | determins if an instance is stopped before snapshotting |

<a name="SnapshotAPI..updateSnapshot"></a>

### SnapshotAPI~updateSnapshot(name, instance_id, safe) ⇒ <code>Promise</code>
updates a snapshot of a given instance

**Kind**: inner method of [<code>SnapshotAPI</code>](#SnapshotAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the foirewall list or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/snapshots#create-a-new-or-update-an-old-snapshot](https://www.civo.com/api/snapshots#create-a-new-or-update-an-old-snapshot)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | the new name of the snapshot |
| instance_id | <code>String</code> | the id of the instance to be snapshotted |
| safe | <code>Boolean</code> | determins if an instance is stopped before snapshotting |

<a name="SnapshotAPI..deleteSnapshot"></a>

### SnapshotAPI~deleteSnapshot(name) ⇒ <code>Promise</code>
deletes an existing snapshot within civo

**Kind**: inner method of [<code>SnapshotAPI</code>](#SnapshotAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/snapshots#deleting-a-snapshot](https://www.civo.com/api/snapshots#deleting-a-snapshot)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | the snapshots name to be used to identify the network in civo |

<a name="SSHKeysAPI"></a>

## SSHKeysAPI
**Kind**: global mixin  

* [SSHKeysAPI](#SSHKeysAPI)
    * [~listSSHKeys()](#SSHKeysAPI..listSSHKeys) ⇒ <code>Promise</code>
    * [~uploadSSHKey(name, public_key)](#SSHKeysAPI..uploadSSHKey) ⇒ <code>Promise</code>
    * [~deleteSSHKey(name)](#SSHKeysAPI..deleteSSHKey) ⇒ <code>Promise</code>

<a name="SSHKeysAPI..listSSHKeys"></a>

### SSHKeysAPI~listSSHKeys() ⇒ <code>Promise</code>
gets an array of the currently available ssh keys on civo cloud

**Kind**: inner method of [<code>SSHKeysAPI</code>](#SSHKeysAPI)  
**Returns**: <code>Promise</code> - a promise which resolves with the sshkeys list or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/sshkeys#listing-the-ssh-keys](https://www.civo.com/api/sshkeys#listing-the-ssh-keys)  
<a name="SSHKeysAPI..uploadSSHKey"></a>

### SSHKeysAPI~uploadSSHKey(name, public_key) ⇒ <code>Promise</code>
uploads a supplied ssh key into civo

**Kind**: inner method of [<code>SSHKeysAPI</code>](#SSHKeysAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result and id or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/sshkeys#uploading-an-ssh-key](https://www.civo.com/api/sshkeys#uploading-an-ssh-key)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | the name to be used to identify the key in civo |
| public_key | <code>String</code> | the public key string to be uploaded |

<a name="SSHKeysAPI..deleteSSHKey"></a>

### SSHKeysAPI~deleteSSHKey(name) ⇒ <code>Promise</code>
gets an array of the currently available ssh keys on civo cloud

**Kind**: inner method of [<code>SSHKeysAPI</code>](#SSHKeysAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the sshkeys list or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/sshkeys#removing-an-ssh-key](https://www.civo.com/api/sshkeys#removing-an-ssh-key)  

| Param | Type | Description |
| --- | --- | --- |
| name | <code>String</code> | the name of the public key to delete |

<a name="TemplateAPI"></a>

## TemplateAPI
**Kind**: global mixin  

* [TemplateAPI](#TemplateAPI)
    * [~listTemplates()](#TemplateAPI..listTemplates) ⇒ <code>Promise</code>
    * [~createTemplate(name, image_id, [options])](#TemplateAPI..createTemplate) ⇒ <code>Promise</code>
    * [~updateTemplate(id, [options])](#TemplateAPI..updateTemplate) ⇒ <code>Promise</code>
    * [~deleteTemplate(id)](#TemplateAPI..deleteTemplate) ⇒ <code>Promise</code>

<a name="TemplateAPI..listTemplates"></a>

### TemplateAPI~listTemplates() ⇒ <code>Promise</code>
gets an array of the currently available templates on civo cloud

**Kind**: inner method of [<code>TemplateAPI</code>](#TemplateAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the available region list or rejects with an
error  
**Access**: public  
**See**: [https://www.civo.com/api/templates#listing-available-templates](https://www.civo.com/api/templates#listing-available-templates)  
<a name="TemplateAPI..createTemplate"></a>

### TemplateAPI~createTemplate(name, image_id, [options]) ⇒ <code>Promise</code>
creates a new template on the civo account

**Kind**: inner method of [<code>TemplateAPI</code>](#TemplateAPI)  
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

<a name="TemplateAPI..updateTemplate"></a>

### TemplateAPI~updateTemplate(id, [options]) ⇒ <code>Promise</code>
updates an existing template on the civo account

**Kind**: inner method of [<code>TemplateAPI</code>](#TemplateAPI)  
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

<a name="TemplateAPI..deleteTemplate"></a>

### TemplateAPI~deleteTemplate(id) ⇒ <code>Promise</code>
deletes an existing template within civo

**Kind**: inner method of [<code>TemplateAPI</code>](#TemplateAPI)  
**Returns**: <code>Promise</code> - a promise wich resolves with the result or rejects with an error  
**Access**: public  
**See**: [https://www.civo.com/api/templates#deleting-a-template](https://www.civo.com/api/templates#deleting-a-template)  

| Param | Type | Description |
| --- | --- | --- |
| id | <code>String</code> | the templates id to be used to identify the network in civo |

<a name="Backend"></a>

## Backend : <code>Object</code>
**Kind**: global typedef  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| instance_id | <code>String</code> | the backend instance_id |
| protocol | <code>String</code> | the protocol to communicate with the backend on (either 'http' or 'https') |
| port | <code>Number</code> | the port to communicate with the backend on |

