/*
*
* Copyright 2009 AgileTec s.r.l. (http://www.agiletec.it) All rights reserved.
*
* This file is part of jAPS software.
* jAPS is a free software; 
* you can redistribute it and/or modify it
* under the terms of the GNU General Public License (GPL) as published by the Free Software Foundation; version 2.
* 
* See the file License for the specific language governing permissions   
* and limitations under the License
* 
* 
* 
* Copyright 2009 AgileTec s.r.l. (http://www.agiletec.it) All rights reserved.
*
*/
package com.agiletec.plugins.jpwtt.aps.system.services.ticket.alerter;

import com.agiletec.plugins.jpwtt.aps.system.services.ticket.model.InterventionType;
import com.agiletec.plugins.jpwtt.aps.system.services.ticket.model.Ticket;
import com.agiletec.plugins.jpwtt.aps.system.services.ticket.model.TicketOperation;

public interface AlerterThreadListener {
	
	public void sendAlertOnAddedTicket(Ticket ticket, InterventionType interventionType);
	
	public void sendAlertOnTicketOperation(Ticket ticket, TicketOperation operation, InterventionType interventionType);
	
}