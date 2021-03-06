/*
*
* Copyright 2005 AgileTec s.r.l. (http://www.agiletec.it) All rights reserved.
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
* Copyright 2005 AgileTec s.r.l. (http://www.agiletec.it) All rights reserved.
*
*/
package com.agiletec.plugins.jpnewsletter.aps.system.services.newsletter.model;

import java.util.Date;

public class Subscriber {
	
	public String getMailAddress() {
		return _mailAddress;
	}
	public void setMailAddress(String mailAddress) {
		this._mailAddress = mailAddress;
	}
	
	public Date getSubscriptionDate() {
		return _subscriptionDate;
	}
	public void setSubscriptionDate(Date subscriptionDate) {
		this._subscriptionDate = subscriptionDate;
	}

	public boolean isActive() {
		return _active;
	}
	public void setActive(boolean active) {
		this._active = active;
	}
	
	private String _mailAddress;
	private Date _subscriptionDate;
	private boolean _active;
	
}