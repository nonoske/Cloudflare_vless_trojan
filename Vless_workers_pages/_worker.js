# Query: Uuid
# ContextLines: 1

179 results - 5 files

kp.sh:
    5  SCRIPT_PATH="/root/kp.sh"                    # 脚本路径
    6:  # serv00或ct8服务器及端口配置。修改s0.serv00.com的服务区(默认s0)，使用argo临时域名时，仅填 账号:密码:UUID:tcp1端口:tcp2端口:udp端口:reality域名 即可
    7: declare -A servers=(  # 账号:密码:UUID:tcp1端口:tcp2端口:udp端口:argo固定域名:Argo固定隧道密钥(json或token) 
    8      ["s0.serv00.com"]='ygkkk:A@123456:2f690ba2-b460-43ca-b9c3-1ac843bd2c70:5525:55255:55255:www.speedtest.net'

   83      local ssh_pass=$3
   84:     local suuid=$4
   85      local tcp1_port=$5

   91  
   92:     remote_command="reym=${reality} UUID=$suuid vless_port=$tcp1_port vmess_port=$tcp2_port hy2_port=$udp_port ARGO_DOMAIN=$argo_domain ARGO_AUTH='$argo_auth' bash <(curl -Ls https://raw.githubusercontent.com/yonggekkk/Cloudflare_vless_trojan/main/serv00keep.sh)"
   93   

   98  for host in "${!servers[@]}"; do
   99:     IFS=':' read -r ssh_user ssh_pass suuid tcp1_port tcp2_port udp_port reality argo_domain argo_auth <<< "${servers[$host]}"
  100  

  136              green "$time  SSH远程连接成功 服务器: $host  账户 : $ssh_user"
  137:             output=$(run_remote_command "$host" "$ssh_user" "$ssh_pass" "$suuid" "$tcp1_port" "$tcp2_port" "$udp_port" "$reality" "$argo_domain" "$argo_auth")
  138              yellow "远程命令执行结果：\n"

README.md:
    8  #### 2、为减少新手小白额外的成本，本项目不推荐使用自定义域名，如果你一定要用自定义域名，也可以
    9: #### 3、当在CF点击部署按钮后，可直接手搓节点或者使用分享链接，最多设置一个uuid/密码，其他不用改
   10  #### 4、Workers方式：支持vless+ws+tls、trojan+ws+tls、vless+ws、trojan+ws代理节点

   12  #### 6、支持单节点链接、聚合通用节点链接、聚合通用节点订阅、sing-box节点订阅、clash节点订阅
   13: #### 7、虽然仅乱码混淆版可用，但只有修改uuid/密码时才必须使用变量
   14  -------------------------------------------------------------

   30  | :--- | :--- | :--- | :--- | :--- |
   31: | 1、必要的uuid | uuid (小写字母) |符合uuid规定格式 |万人骑uuid：d3bb07f5-5c3e-41bd-b495-88aa6daf566e|建议|
   32  | 2、全局节点能上CF类网站 | proxyip (小写字母) |443端口：ipv4地址、[ipv6地址]、域名。非443端口：IPV4地址:端口、[IPV6地址]:端口、域名:端口|proxyip域名：ts.hpc.tw公用域名|可选|

  141  
  142: CF Vless：在网页地址栏输入 https:// workers域名 或者 pages域名 或者 自定义域名 /自定义uuid
  143  

serv00.sh:
   31  
   32: read_uuid() {
   33:         reading "请输入统一的uuid密码 (建议回车默认随机): " UUID
   34:         if [[ -z "$UUID" ]]; then
   35: 	   UUID=$(uuidgen -r)
   36          fi
   37: 	green "你的uuid为: $UUID"
   38  }

  100  	echo
  101: 	read_uuid
  102   	echo

  279           {
  280:              "password": "$UUID"
  281           }

  300              {
  301:               "uuid": "$UUID",
  302                "flow": "xtls-rprx-vision"

  327        {
  328:         "uuid": "$UUID"
  329        }

  332        "type": "ws",
  333:       "path": "$UUID-vm",
  334        "early_data_header_name": "Sec-WebSocket-Protocol"

  466  curl -sSL https://raw.githubusercontent.com/yonggekkk/Cloudflare_vless_trojan/main/serv00keep.sh -o serv00keep.sh && chmod +x serv00keep.sh
  467: sed -i '' -e "18s|''|'$UUID'|" serv00keep.sh
  468  sed -i '' -e "21s|''|'$vless_port'|" serv00keep.sh

  489  rm -rf jh.txt
  490: vl_link="vless://$UUID@$IP:$vless_port?encryption=none&flow=xtls-rprx-vision&security=reality&sni=$reym&fp=chrome&pbk=$public_key&type=tcp&headerType=none#$NAME-reality"
  491  echo "$vl_link" >> jh.txt
  492: vmws_link="vmess://$(echo "{ \"v\": \"2\", \"ps\": \"$NAME-vmess-ws\", \"add\": \"$IP\", \"port\": \"$vmess_port\", \"id\": \"$UUID\", \"aid\": \"0\", \"scy\": \"auto\", \"net\": \"ws\", \"type\": \"none\", \"host\": \"\", \"path\": \"/$UUID-vm?ed=2048\", \"tls\": \"\", \"sni\": \"\", \"alpn\": \"\", \"fp\": \"\"}" | base64 -w0)"
  493  echo "$vmws_link" >> jh.txt
  494: vmatls_link="vmess://$(echo "{ \"v\": \"2\", \"ps\": \"$NAME-vmess-ws-tls-argo\", \"add\": \"icook.hk\", \"port\": \"8443\", \"id\": \"$UUID\", \"aid\": \"0\", \"scy\": \"auto\", \"net\": \"ws\", \"type\": \"none\", \"host\": \"$argodomain\", \"path\": \"/$UUID-vm?ed=2048\", \"tls\": \"tls\", \"sni\": \"$argodomain\", \"alpn\": \"\", \"fp\": \"\"}" | base64 -w0)"
  495  echo "$vmatls_link" >> jh.txt
  496: vma_link="vmess://$(echo "{ \"v\": \"2\", \"ps\": \"$NAME-vmess-ws-argo\", \"add\": \"icook.hk\", \"port\": \"8880\", \"id\": \"$UUID\", \"aid\": \"0\", \"scy\": \"auto\", \"net\": \"ws\", \"type\": \"none\", \"host\": \"$argodomain\", \"path\": \"/$UUID-vm?ed=2048\", \"tls\": \"\"}" | base64 -w0)"
  497  echo "$vma_link" >> jh.txt
  498: hy2_link="hysteria2://$UUID@$IP:$hy2_port?sni=www.bing.com&alpn=h3&insecure=1#$NAME-hy2"
  499  echo "$hy2_link" >> jh.txt

  676        "server_port": $vless_port,
  677:       "uuid": "$UUID",
  678        "packet_encoding": "xudp",

  713                  },
  714:                 "path": "/$UUID-vm",
  715                  "type": "ws"

  718              "security": "auto",
  719:             "uuid": "$UUID"
  720          },

  726          "server_port": $hy2_port,
  727:         "password": "$UUID",
  728          "tls": {

  756                  },
  757:                 "path": "/$UUID-vm",
  758                  "type": "ws"

  761              "security": "auto",
  762:             "uuid": "$UUID"
  763          },

  783                  },
  784:                 "path": "/$UUID-vm",
  785                  "type": "ws"

  788              "security": "auto",
  789:             "uuid": "$UUID"
  790          },

  922    port: $vless_port                                
  923:   uuid: $UUID   
  924    network: tcp

  936    port: $vmess_port                                     
  937:   uuid: $UUID       
  938    alterId: 0

  944    ws-opts:
  945:     path: "/$UUID-vm"                             
  946      headers:

  952    port: $hy2_port                                
  953:   password: $UUID                          
  954    alpn:

  963    port: 8443                                     
  964:   uuid: $UUID       
  965    alterId: 0

  971    ws-opts:
  972:     path: "/$UUID-vm"                             
  973      headers:

  979    port: 8880                                     
  980:   uuid: $UUID       
  981    alterId: 0

  987    ws-opts:
  988:     path: "/$UUID-vm"                             
  989      headers:

serv00keep.sh:
   17  
   18: export UUID=${UUID:-''}  
   19  export ARGO_DOMAIN=${ARGO_DOMAIN:-''}   

  163           {
  164:              "password": "$UUID"
  165           }

  184              {
  185:               "uuid": "$UUID",
  186                "flow": "xtls-rprx-vision"

  211        {
  212:         "uuid": "$UUID"
  213        }

  216        "type": "ws",
  217:       "path": "$UUID-vm",
  218        "early_data_header_name": "Sec-WebSocket-Protocol"

  355  rm -rf jh.txt
  356: vl_link="vless://$UUID@$IP:$vless_port?encryption=none&flow=xtls-rprx-vision&security=reality&sni=$reym&fp=chrome&pbk=$public_key&type=tcp&headerType=none#$NAME-reality"
  357  echo "$vl_link" >> jh.txt
  358: vmws_link="vmess://$(echo "{ \"v\": \"2\", \"ps\": \"$NAME-vmess-ws\", \"add\": \"$IP\", \"port\": \"$vmess_port\", \"id\": \"$UUID\", \"aid\": \"0\", \"scy\": \"auto\", \"net\": \"ws\", \"type\": \"none\", \"host\": \"\", \"path\": \"/$UUID-vm?ed=2048\", \"tls\": \"\", \"sni\": \"\", \"alpn\": \"\", \"fp\": \"\"}" | base64 -w0)"
  359  echo "$vmws_link" >> jh.txt
  360: vmatls_link="vmess://$(echo "{ \"v\": \"2\", \"ps\": \"$NAME-vmess-ws-tls-argo\", \"add\": \"icook.hk\", \"port\": \"8443\", \"id\": \"$UUID\", \"aid\": \"0\", \"scy\": \"auto\", \"net\": \"ws\", \"type\": \"none\", \"host\": \"$argodomain\", \"path\": \"/$UUID-vm?ed=2048\", \"tls\": \"tls\", \"sni\": \"$argodomain\", \"alpn\": \"\", \"fp\": \"\"}" | base64 -w0)"
  361  echo "$vmatls_link" >> jh.txt
  362: vma_link="vmess://$(echo "{ \"v\": \"2\", \"ps\": \"$NAME-vmess-ws-argo\", \"add\": \"icook.hk\", \"port\": \"8880\", \"id\": \"$UUID\", \"aid\": \"0\", \"scy\": \"auto\", \"net\": \"ws\", \"type\": \"none\", \"host\": \"$argodomain\", \"path\": \"/$UUID-vm?ed=2048\", \"tls\": \"\"}" | base64 -w0)"
  363  echo "$vma_link" >> jh.txt
  364: hy2_link="hysteria2://$UUID@$IP:$hy2_port?sni=www.bing.com&alpn=h3&insecure=1#$NAME-hy2"
  365  echo "$hy2_link" >> jh.txt

  542        "server_port": $vless_port,
  543:       "uuid": "$UUID",
  544        "packet_encoding": "xudp",

  579                  },
  580:                 "path": "/$UUID-vm",
  581                  "type": "ws"

  584              "security": "auto",
  585:             "uuid": "$UUID"
  586          },

  592          "server_port": $hy2_port,
  593:         "password": "$UUID",
  594          "tls": {

  622                  },
  623:                 "path": "/$UUID-vm",
  624                  "type": "ws"

  627              "security": "auto",
  628:             "uuid": "$UUID"
  629          },

  649                  },
  650:                 "path": "/$UUID-vm",
  651                  "type": "ws"

  654              "security": "auto",
  655:             "uuid": "$UUID"
  656          },

  788    port: $vless_port                                
  789:   uuid: $UUID   
  790    network: tcp

  802    port: $vmess_port                                     
  803:   uuid: $UUID       
  804    alterId: 0

  810    ws-opts:
  811:     path: "/$UUID-vm"                             
  812      headers:

  818    port: $hy2_port                                
  819:   password: $UUID                          
  820    alpn:

  829    port: 8443                                     
  830:   uuid: $UUID       
  831    alterId: 0

  837    ws-opts:
  838:     path: "/$UUID-vm"                             
  839      headers:

  845    port: 8880                                     
  846:   uuid: $UUID       
  847    alterId: 0

  853    ws-opts:
  854:     path: "/$UUID-vm"                             
  855      headers:

Vless_workers_pages/vless源码(请使用上面的_worker.js，本文件无法使用，仅供DIY).js:
     4  
     5: // How to generate your own UUID:
     6  // [Windows] Press "Win + R", input cmd and run:  Powershell -NoExit -Command "[guid]::NewGuid()"

    48  
    49: if (!isValidUUID(userID)) {
    50:   throw new Error("uuid is not valid");
    51  }

    55     * @param {import("@cloudflare/workers-types").Request} request
    56:    * @param {uuid: string, proxyip: string, cdnip: string, ip1: string, ip2: string, ip3: string, ip4: string, ip5: string, ip6: string, ip7: string, ip8: string, ip9: string, ip10: string, ip11: string, ip12: string, ip13: string, pt1: string, pt2: string, pt3: string, pt4: string, pt5: string, pt6: string, pt7: string, pt8: string, pt9: string, pt10: string, pt11: string, pt12: string, pt13: string} env
    57     * @param {import("@cloudflare/workers-types").ExecutionContext} ctx

    62        const { proxyip } = env;
    63:       userID = env.uuid || userID;
    64  			if (proxyip) {

   362  /**
   363:  * Checks if a given UUID is present in the API response.
   364:  * @param {string} targetUuid The UUID to search for.
   365:  * @returns {Promise<boolean>} A Promise that resolves to true if the UUID is present in the API response, false otherwise.
   366   */
   367: async function checkUuidInApiResponse(targetUuid) {
   368    // Check if any of the environment variables are empty

   374      }
   375:     const isUuidInResponse = apiResponse.users.some((user) => user.uuid === targetUuid);
   376:     return isUuidInResponse;
   377    } catch (error) {

   524  
   525:   const uuids = userID.includes(",") ? userID.split(",") : [userID];
   526  
   527:   const checkUuidInApi = await checkUuidInApiResponse(slicedBufferString);
   528:   isValidUser = uuids.some((userUuid) => checkUuidInApi || slicedBufferString === userUuid.trim());
   529  
   530:   console.log(`checkUuidInApi: ${await checkUuidInApiResponse(slicedBufferString)}, userID: ${slicedBufferString}`);
   531  

   701  /**
   702:  * This is not real UUID validation
   703:  * @param {string} uuid
   704   */
   705: function isValidUUID(uuid) {
   706:   const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[4][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
   707:   return uuidRegex.test(uuid);
   708  }

   754  function stringify(arr, offset = 0) {
   755:   const uuid = unsafeStringify(arr, offset);
   756:   if (!isValidUUID(uuid)) {
   757:     throw TypeError("Stringified UUID is invalid");
   758    }
   759:   return uuid;
   760  }

   922                  <li>端口(port)：7个http端口可任意选择(80、8080、8880、2052、2082、2086、2095)，或反代IP对应端口</li>
   923:                 <li>用户ID(uuid)：${userID}</li>
   924                  <li>传输协议(network)：ws 或者 websocket</li>

   953                  <li>端口(port)：6个https端口可任意选择(443、8443、2053、2083、2087、2096)，或反代IP对应端口</li>
   954:                 <li>用户ID(uuid)：${userID}</li>
   955                  <li>传输协议(network)：ws 或者 websocket</li>

  1071                  <li>端口(port)：6个https端口可任意选择(443、8443、2053、2083、2087、2096)，或反代IP对应端口</li>
  1072:                 <li>用户ID(uuid)：${userID}</li>
  1073                  <li>传输协议(network)：ws 或者 websocket</li>

  1195    port: ${PT1}
  1196:   uuid: ${userID}
  1197    udp: false

  1208    port: ${PT2}
  1209:   uuid: ${userID}
  1210    udp: false

  1221    port: ${PT3}
  1222:   uuid: ${userID}
  1223    udp: false

  1234    port: ${PT4}
  1235:   uuid: ${userID}
  1236    udp: false

  1247    port: ${PT5}
  1248:   uuid: ${userID}
  1249    udp: false

  1260    port: ${PT6}
  1261:   uuid: ${userID}
  1262    udp: false

  1273    port: ${PT7}
  1274:   uuid: ${userID}
  1275    udp: false

  1287    port: ${PT8}
  1288:   uuid: ${userID}
  1289    udp: false

  1301    port: ${PT9}
  1302:   uuid: ${userID}
  1303    udp: false

  1315    port: ${PT10}
  1316:   uuid: ${userID}
  1317    udp: false

  1329    port: ${PT11}
  1330:   uuid: ${userID}
  1331    udp: false

  1343    port: ${PT12}
  1344:   uuid: ${userID}
  1345    udp: false

  1357    port: ${PT13}
  1358:   uuid: ${userID}
  1359    udp: false

  1563  		  "type": "vless",
  1564: 		  "uuid": "${userID}"
  1565  		},

  1580  		  "type": "vless",
  1581: 		  "uuid": "${userID}"
  1582  		},

  1597  		  "type": "vless",
  1598: 		  "uuid": "${userID}"
  1599  		},

  1614  		  "type": "vless",
  1615: 		  "uuid": "${userID}"
  1616  		},

  1631  		  "type": "vless",
  1632: 		  "uuid": "${userID}"
  1633  		},

  1648  		  "type": "vless",
  1649: 		  "uuid": "${userID}"
  1650  		},

  1665  		  "type": "vless",
  1666: 		  "uuid": "${userID}"
  1667  		},

  1691  		  "type": "vless",
  1692: 		  "uuid": "${userID}"
  1693  		},

  1717  		  "type": "vless",
  1718: 		  "uuid": "${userID}"
  1719  		},

  1743  		  "type": "vless",
  1744: 		  "uuid": "${userID}"
  1745  		},

  1769  		  "type": "vless",
  1770: 		  "uuid": "${userID}"
  1771  		},

  1795  		  "type": "vless",
  1796: 		  "uuid": "${userID}"
  1797  		},

  1821  		  "type": "vless",
  1822: 		  "uuid": "${userID}"
  1823  		},

  1970    port: ${PT8}
  1971:   uuid: ${userID}
  1972    udp: false

  1984    port: ${PT9}
  1985:   uuid: ${userID}
  1986    udp: false

  1998    port: ${PT10}
  1999:   uuid: ${userID}
  2000    udp: false

  2012    port: ${PT11}
  2013:   uuid: ${userID}
  2014    udp: false

  2026    port: ${PT12}
  2027:   uuid: ${userID}
  2028    udp: false

  2040    port: ${PT13}
  2041:   uuid: ${userID}
  2042    udp: false

  2227  			  "type": "vless",
  2228: 			  "uuid": "${userID}"
  2229  			},

  2253  			  "type": "vless",
  2254: 			  "uuid": "${userID}"
  2255  			},

  2279  			  "type": "vless",
  2280: 			  "uuid": "${userID}"
  2281  			},

  2305  			  "type": "vless",
  2306: 			  "uuid": "${userID}"
  2307  			},

  2331  			  "type": "vless",
  2332: 			  "uuid": "${userID}"
  2333  			},

  2357  			  "type": "vless",
  2358: 			  "uuid": "${userID}"
  2359  			},
